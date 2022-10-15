import { NextPage } from "next";
import React ,{useState}from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import styles from "../styles/Profile.module.scss";
import { ToastContainer, toast } from 'react-toastify';
import { updateProfile } from "./api/profile";

const Profile = () => {


  const Input = styled("input")({
    display: "none",
  });
  const currencies = [
    {
      value: "working",
      label: "Working",
    },
    {
      value: "student",
      label: "Student",
    },
  ];

// const AvailableFor=()=>{
//   const Input=styled("input")({
//     display:"none"
//   });

  const Available=[
    {
      value:"hackathon",
      label:"Hackathon"
    },
    {
      value:"competative_programing",
      label:"Competativeprograming"
    },
    {
      value:"dsa",
      label:"DSA"
    },
  ]



  const [profession, setProfession] = React.useState<string |"">("student");
  const [available,setAvailable]=React.useState<string |  "">("hackathon")
  const [socialLink,setSocialLink]=React.useState<social | undefined>(undefined);
  const [image,setImage]=useState<FormData | undefined>(undefined);
  const [name,setName]=useState<string | "">("");
  const [description,setDescription]=useState<string | "">("");


  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setProfession(event.target.value);
   

    
  // };
  interface social{
    github:string | ""
}
  interface Profile {
    name:string | ""
    social:social | undefined
    profession:string | ""
    description:string | ""
    availableFor:string | ""
    profile: FormData | undefined
} 

const onSubmit=()=>{
  
  const Profile:Profile={name:name,profession,availableFor:available,social:socialLink,profile:image,description}

  toast.promise(
    updateProfile({...Profile}),
    {
      position: toast.POSITION.TOP_LEFT,
      pending:{
        render(){
          return "Updating..... Profile"
        }

        },
      success:{
        render({data}){
          return "Profile Updated"
        } 

        },
      error:{
        render({data}){
          return `${data}`
        }
      }
    }

  )
}

  return (
    <>
      <Container maxWidth={false} className={styles.container}>
        <div className={styles.container_small}>
          <Typography variant="h2" component="h2" align="center">
            FIND DEV
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <div className={styles.test}>
                <Typography variant="body2" fontSize={20} component="span" align="center">
                  Name
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  className={styles.form_input}
                  size="small"
                  name="name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>
             
              <div className={styles.test}>
                <Typography variant="body2"  fontSize={20} component="span" align="center">
                  Profession
                </Typography>
                <TextField
                  size="small"
                  // id="outlined-select-currency"
                  select
                  label="Select"
                  value={profession}
                  onChange={(e)=>setProfession(e.target.value)}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className={styles.test}>
                <Typography variant="body2"  fontSize={20} component="span" align="center">
                  Available For
                </Typography>
                <TextField
                  size="small"
                  id="outlined-select-currency"
                  select
                  label="Select"
                  value={available}
                  onChange={(event)=> setAvailable(event.target.value)}
                >
                  {Available.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className={styles.test}>
                <Typography variant="body2"  fontSize={20} component="span" align="center">
                Github Link
                </Typography>
                <TextField
                  size="small"
                  id="outlined-select-currency"
                
                  label="Link"
                  value={ socialLink?.github  }
                  onChange={(e)=>setSocialLink({github:e.target.value})}
                >
                
                </TextField>
              </div>
              <div className={styles.test}>
                <Typography variant="body2"  fontSize={20} component="span" align="center">
                  Discription
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Description"
                  placeholder="Description"
                  variant="outlined"
                  className={styles.form_input}
                  multiline
                  value={description}
                  onChange={(e)=>{
                    setDescription(e.target.value)
                  }}
                  name="name"
                />
              </div>
              <div className={styles.test}>
                <Typography variant="body2" fontSize={20}  component="span" align="center">
                  Profile Image
                </Typography>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    
                    type="file"
                    onChange={(event)=>{
                      const data=new FormData();
                      data.append("profile",event.target.value);
                      setImage(data);
                    }}
                  />
                  <Button variant="contained"  component="span" >
                    Upload
                  </Button>
                </label>
              </div>
              <div></div>
            </Grid>
          </Grid>
        </div>
      <ToastContainer/>
      </Container>
      <button onClick={onSubmit}>
        submit
      </button>
      {JSON.stringify({name:name,profession,availableFor:available,social:socialLink,profile:image,description})}
    </>
  );
};

export default Profile;
