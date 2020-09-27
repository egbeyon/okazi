import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  createField,
  updateField,
  deleteField
} from "../../../../actions/fieldActions";
import {
  createProject,
  updateProject,
  deleteProject
} from "../../../../actions/projectsActions";

import "./Modal.scss";

class Modalfield extends Component {

    state = {
      projectName: "",
      members: [{ name: "", email: "" }],
        
        user: '', 
        longitude: 0,
        latitude: 0,
        locality: '',
        rockName: 'granite', 
        mineralogy: '',
        texture: '', 
        color: '',
        date: '', 
        remark: '',
        fieldId: ''
      };

      componentWillReceiveProps(nextProps) {
        if (nextProps.edit) {
          this.setState({
            projectName: nextProps.name,
            members: nextProps.members,
          
          });
        } 
        else if (nextProps.editField) {
          this.setState({
            fieldId: nextProps.fieldId,
            rockName: nextProps.rockName,
            longitude: nextProps.longitude,
            latitude: nextProps.latitude,
            texture: nextProps.texture,
            color: nextProps.color,
            locality: nextProps.locality,
            mineralogy: nextProps.mineralogy,
            remark: nextProps.remark
            
           }); 
          console.log(nextProps)
        }
      }

      componentDidMount() {        
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                })
            })
        }
    }

    onChange = e => {
      if (["name", "email"].includes(e.target.name)) {
        let members = [...this.state.members];
        members[e.target.dataset.id][e.target.name] = e.target.value;
        this.setState({ members });
      } else {
        this.setState({ [e.target.id]: e.target.value });
      }
    };
  
    addMember = e => {
      this.setState(prevState => ({
        members: [...prevState.members, { name: "", email: "" }]
      }));
    };
  
    deleteMember = index => {
      let array = [...this.state.members];
      array.splice(index, 1);
      this.setState({ members: array });
    };

    createProject = () => {
      let project = {
        projectName: this.state.projectName,
        members: this.state.members
      };
  
      this.props.createProject(project);
      this.onClose();
    };
  
    updateProject = async id => {
      let project = {
        id: this.props.id,
        projectName: this.state.projectName,
        members: this.state.members
      };
  
      await this.props.updateProject(project);
  
      this.onClose();
      window.location.reload();
    };
  
    deleteProject = id => {
      this.props.deleteProject(id, this.props.history);
      this.onClose();
    };

      deleteField = id => {
        this.props.deleteField(id);
        this.onClose();
      };

      onClose = e => {
        this.props.onClose && this.props.onClose(e);
        this.setState({
          projectName: "",        
          user: '', 
          longitude: '',
          latitude: '',
          locality: '',
          rockName: '', 
          mineralogy: '',
          texture: '', 
          color: '',
          date: '',
          remark: '',
          members: [{ name: "", email: "" }]
          
        });
      };

      onSelectChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

      createField = () => {
    
        const data = {
          
          project: this.props.projects.project._id,
          user: this.props.auth.user.email, 
          longitude: this.state.longitude,
          latitude: this.state.latitude,
          locality: this.state.locality,
          rockName: this.state.rockName, 
          mineralogy: this.state.mineralogy,
          texture: this.state.texture, 
          color: this.state.color, 
        
          remark: this.state.remark
        };   
    
         this.props.createField(data);
    
        this.onClose();
      };

      updateField = (id) => {
        let field = {
          id: id,
          
          user: this.state.user, 
          longitude: this.state.longitude,
          latitude: this.state.latitude,
          locality: this.state.locality,
          rockName: this.state.rockName, 
          mineralogy: this.state.mineralogy,
          texture: this.state.texture, 
          color: this.state.color,
          Dip: this.state.Dip,
        };
    
        this.props.updateField(field);
    
        this.onClose();
      }

    render() {

      if (!this.props.modal) {
        return null;
      }

      document.onkeyup = e => {
        if (e.keyCode === 27 && this.props.modal) {
          this.onClose();
        }
      };

      let { members } = this.state;

      // Create task modal
    if (this.props.field) {
      const { name } = this.props.auth.user;
        
        return (
            <div>
                <form onSubmit={this.createField} className="modal">
                  <span className="close-modal" onClick={this.onClose}>
                    &times;
                  </span>
                  <h2> Create field data here, {name} </h2>
                 
                    <input id="locality" type="text" 
                         onChange={this.onChange.bind(this)}
                        value={this.state.locality}
                        className="form-input"
                        placeholder="Your locality"
                    /> 
                 
                    <label>
                      
                      <input
                        required
                        onChange={this.onChange.bind(this)}
                        value={this.state.rockName}
                        id="rockName"
                        type="text"
                        placeholder={"What is the name of the rock?"}
                        className="form-input"
                      />
                    </label> 
                 
                   <label> 
                    <input id="longitude" type="text" 
                         onChange={this.onChange.bind(this)}
                        value={this.state.longitude}
                        className="form-input"
                        placeholder="longitude"
                    />° lng </label>                  
                
                
               
                 
                    <label> 
                    <input id="latitude" type="text" 
                         onChange={this.onChange.bind(this)}
                        value={this.state.latitude}
                        className="form-input"
                        placeholder="latitude"
                    />° lat </label> 
                
                
                <div className="split">
                    <input id="mineralogy" type="text" 
                        placeholder="Mineralogy" onChange={this.onChange.bind(this)}
                        value={this.state.mineralogy}
                        className="form-input"
                    />     
                
                </div>

                <div className="split">
                 
                    <input id="texture" type="text" 
                        placeholder="Texture" onChange={this.onChange.bind(this)}
                        value={this.state.texture}
                        className="form-input task-input-split"
                    />  
                    <input id="color" type="text" 
                        placeholder="Color" onChange={this.onChange.bind(this)}
                        value={this.state.color}
                        className="form-input task-input-split"
                    />     
             
                </div>     
                     <textarea id="remark" type="text" 
                         onChange={this.onChange.bind(this)}
                        value={this.state.remark}
                        className="form-input"
                        placeholder="remark" />
                 
                  <div>
                    <button className="main-btn update-project" type="submit"  >
                      Save
                    </button>
                  </div>
                </form>
      
            </div>
        )
    }

     // Edit Task Modal
     else if (this.props.editField) {
      
      const { email } = this.props.auth.user;
      const { fieldId } = this.props
      
        

      return (
        <form className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
                  <h1 className="header">Edit field data</h1>
                  <p className="created-by">
                    Created by {} ({email})
                  </p>
                  <label>
                   
                   <input
                     required
                     onChange={this.onChange.bind(this)}
                     value={this.state.rockName}
                     id="rockName"
                     type="text"
                     placeholder={"What is the name of the rock?"}
                     className="form-input"
                   />
                 </label> 
                 
                
               <div className="split">
                
               <input id="locality" type="text" 
                      onChange={this.onChange.bind(this)}
                     value={this.state.locality}
                     
                     className="form-input"
                     placeholder={"Your locality"}
                 /> 
                 <label> 
                 <input id="longitude" type="text" 
                      onChange={this.onChange.bind(this)}
                     value={this.state.longitude}
                     className="form-input"
                     placeholder="longitude"
                 />° lng </label>                  
             
             </div>
             <div className="split">
              
                 <label> 
                 <input id="latitude" type="text" 
                      onChange={this.onChange.bind(this)}
                     value={this.state.latitude}
                     className="form-input task-input-split"
                     placeholder="latitude"
                 />° lat </label> 
             </div>
             
             <div className="split">
                 <input id="mineralogy" type="text" 
                     placeholder="Mineralogy" onChange={this.onChange.bind(this)}
                     value={this.state.mineralogy}
                     className="form-input task-input-split"
                 />      
             
             </div>

              <div className="split">
              
                 <input id="texture" type="text" 
                     placeholder="Texture" onChange={this.onChange.bind(this)}
                     value={this.state.texture}
                     className="form-input task-input-split"
                 />     
             
         
                 
                 <input id="color" type="text" 
                     placeholder="Color" onChange={this.onChange.bind(this)}
                     value={this.state.color}
                     className="form-input task-input-split"
                 />     
          
             </div> 
                  <textarea id="remark" type="text" 
                      onChange={this.onChange.bind(this)}
                     value={this.state.remark}
                     className="form-input"
                     placeholder="remark" />
              
            <div>
            <button
              className="main-btn update-project"
              type="button"
              onClick={this.updateField.bind(this, fieldId)}
            >
              Update Data
            </button>
            <button
              className="main-btn delete-project"
              onClick={this.deleteField.bind(this, fieldId)}
            >
              Delete Data
            </button>
          </div>
        
        </form>
      );
    }

     // Edit project modal
     else if (this.props.edit) {
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Edit Project Info</h1>
          <p className="created-by">
            Created by {this.props.owner.name} ({this.props.owner.email})
          </p>
          <div className="form-group">
          <div>
            
            {this.props.owner.id === this.props.auth.user.id ? (
              <div className="updaters">
                <div>
                <button
              className="main-btn update-project"
              onClick={this.updateProject.bind(this, this.props.id)}
            >
              Update Project
            </button>
                </div>
              <div>
              <button
                className="main-btn delete-project"
                onClick={this.deleteProject.bind(this, this.props.id)}
              >
                Delete Project
              </button>
              </div>
              </div>
             ) : null} 
          </div>
            <label>
              <div className="form-label">Project Name (required)</div>
              <input
                onChange={this.onChange}
                value={this.state.projectName}
                id="projectName"
                type="text"
                placeholder={"My Awesome Project"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-label">Add team members (optional)</div>
          <button className="main-btn add-members" onClick={this.addMember}>
            Add another member
          </button>
          <div className="members-edit">
            {members.map((val, id) => {
              let memberId = `member-${id}`,
                emailId = `email-${id}`;
              return (
                <div>
                <div className="split" key={id}>
                  <label className="form-label" htmlFor={memberId}>
                    Name (required)
                    <input
                      type="text"
                      name="name"
                      data-id={id}
                      id={memberId}
                      value={members[id].name}
                      className="form-input splitter"
                      onChange={this.onChange}
                    />
                  </label>
                  
                  <label className="form-label split-email" htmlFor={emailId}>
                    Email (required)
                    <input
                      type="text"
                      name="email"
                      data-id={id}
                      id={emailId}
                      value={members[id].email}
                      className="form-input splitter"
                      onChange={this.onChange}
                    />
                  </label>
                  <span
                    className="delete"
                    onClick={this.deleteMember.bind(this, id)}
                  >
                    X
                  </span>
                  </div>
                  
                </div>
              );
            })}
          </div>
         
        </div>
      );
    }

    // Create project modal
    else
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Create a project</h1>
          <div className="form-group">
            <label>
              <div className="form-label">Project Name (required)</div>
              <input
                onChange={this.onChange}
                value={this.state.projectName}
                id="projectName"
                type="text"
                placeholder="My Awesome Project"
                className="form-input"
              />
            </label>
          </div>
          <div className="form-label">Add team members (optional)</div>
          <button className="main-btn add-members" onClick={this.addMember}>
            Add another member
          </button>
          <div className="members">
            {members.map((val, id) => {
              let memberId = `member-${id}`,
                emailId = `email-${id}`;
              return (
                <div className="split" key={id}>
                  <label className="form-label" htmlFor={memberId}>
                    Name (required for teams)
                    <input
                      type="text"
                      name="name"
                      data-id={id}
                      id={memberId}
                      value={members[id].name}
                      className="form-input"
                      onChange={this.onChange}
                    />
                  </label>
                  <label className="form-label split-email" htmlFor={emailId}>
                    Email (required for teams)
                    <input
                      type="text"
                      name="email"
                      data-id={id}
                      id={emailId}
                      value={members[id].email}
                      className="form-input"
                      onChange={this.onChange}
                    />
                  </label>
                  <span
                    className="delete"
                    onClick={this.deleteMember.bind(this, id)}
                  >
                    X
                  </span>
                </div>
              );
            })}
          </div>
          <div>
            <button
              className="main-btn create-project"
              onClick={this.createProject}
            >
              Create Project
            </button>
          </div>
        </div>
      )
    }
}

const mapStateToProps = state => ({
  auth: state.auth,
  projects: state.projects,
  project:state.project,
  fields: state.fields
});

export default connect(
  mapStateToProps,
  {
    createField,
    updateField,
    deleteField,
    createProject,
    deleteProject,
    updateProject
  }
)(withRouter(Modalfield));