import React, { Component } from "react";
import { connect } from "react-redux";
import { getProject } from "../../../actions/projectsActions";
import { getField, updateField, deleteField } from "../../../actions/fieldActions";

import Modalfield from "../MainContent/Modal/modalfield"; 

import "./MainContent.scss";
import "./Project/Project.scss";

class EachTask extends Component {
  state = {
    
    modal: false,
    edit: false,
    editField: false,
    field: false,

    name: '',
    members: [],
    id: "",
    owner: {},

    user: '', 
    longitude: '',
    latitude: '',
    locality: '',
    rockName: 'granite', 
    mineralogy: '',
    texture: '', 
    color: '', 
    remark: '', 

    fields: [],
    fieldId: ''

  };


  toggleModal = e => {
    this.setState({
      modal: !this.state.modal,
      edit: false,
      field: false,
      editField: false
    });
  };

  toggleEditModal = (name, members, id, owner, e) => {
    this.setState({
      modal: !this.state.modal,
      edit: !this.state.edit,
      name: name,
      members: members,
      id: id,
      owner: owner
    });
  };

  toggleFieldModal = e => {
    this.setState({
      modal: !this.state.modal,
      field: !this.state.field
    });
  };


  toggleEditFieldModal = (longitude, latitude, locality, rockName,
    //elevation, rockType, Dip, Strike,
    mineralogy, texture, color, remark, id,  e) => 
    {
    this.setState({
      modal: !this.state.modal,
      editField: !this.state.editField, 
      longitude: longitude,
      latitude: latitude,
      //elevation: elevation,
      locality: locality,
      rockName: rockName, 
      //rockType: rockType, 
      mineralogy: mineralogy,
      texture: texture, 
      color: color,
      //Dip: Dip, 
      //Strike: Strike, 
      remark: remark,
      fieldId: id
    });
  };

  componentDidMount() {
    this.props.getProject(this.props.match.params.project);
    this.props.getField(this.props.match.params.project);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.project !== prevProps.match.params.project) {
      this.props.getProject(this.props.match.params.project);
      this.props.getField(this.props.match.params.project);
    }
  }

  onChange = async e => {
    await this.setState({ fields: this.props.fields.fields });

    let fields = await [...this.state.fields];

    fields[e.target.id].rockName = await e.target.value;

    await this.setState({ fields });
  };

  deleteField = id => {
    this.props.deleteField(id);
  };

  render() {
    const { fields } = this.props.fields
    console.log(fields)
    let fieldList = fields.map((field, index) => (
      <div className="task-input" key={field._id}>
        <i
          className="material-icons trash"
          onClick={this.deleteField.bind(this, field._id)}
        >
          delete
        </i>
        <span 
        
        onClick={
          this.toggleEditFieldModal.bind(
          this,  
            field.longitude, 
            field.latitude, 
            field.locality,
            field.rockName, 
            //field.rockType,
            field.mineralogy, 
            field.texture, 
            field.color,
            //field.Dip, 
           // field.Strike, 
            //field.elevation,
            field.remark,
            field._id
            )
          }
            
          id={index}
          name="task"
          className="project-task"
        >
          {field.rockName}
        </span >
         <span
          className={
            !field.locality ? "task-info muted" : "task-info"
          }
        >
           {field.locality} 
        </span>
        <span
         className={
          field.date === "Date undefined" ? "task-info muted" : "task-info"
        }
        >
          {field.date}
        </span> 
        </div>
    ));

      const { project } = this.props;

      return (
        
        <div className="main-content">
         <h1 className="project-header">{project.name}</h1>
          <button
            onClick={this.toggleEditModal.bind(
              this,
              project.name,
              project.teamMembers,
              project._id,
              project.owner
            )}
            className="main-btn center-btn"
          >
            Edit Project Info
          </button>
          <div className="modal-wrapper">
            <Modalfield
              onClose={this.toggleModal}
              modal={this.state.modal}
              edit={this.state.edit}
              field={this.state.field}
              editField={this.state.editField}
              name={this.state.name}
              members={this.state.members}
              id={this.state.id}
              owner={this.state.owner}  
              user={this.props.auth.user.email} 
              longitude={this.state.longitude}
              latitude={this.state.latitude}
              elevation={this.state.elevation}
              locality={this.state.locality}
              rockName={this.state.rockName} 
              rockType={this.state.rockType} 
              mineralogy={this.state.mineralogy}
              texture={this.state.texture} 
              color={this.state.color}
              Dip={this.state.Dip} 
              Strike={this.state.Strike} 
              remark={this.state.remark}
              fieldId={this.state.fieldId}
            />
          </div>
          <div className="tasks-container">
            <div className="projects-first-row">
              <button
                className="main-btn add-btn"
                onClick={this.toggleFieldModal}
              >
                Add Data
              </button>
              <div className="projects-column-headers">
                <p>Locality</p>
                <p>date</p>
              </div>
            </div>
            <div className="project-tasks">{fieldList}</div>
          </div>
        </div>
      
       )

   }
}

  const mapStateToProps = state => ({
    auth: state.auth,
     
     project: state.projects.project,
     projects: state.projects,
    fields: state.fields
  });
  
  export default connect(
    mapStateToProps,
    { getProject, updateField, getField, deleteField }
  )(EachTask);

