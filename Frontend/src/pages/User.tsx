import React, {SyntheticEvent, useState} from "react";

const User = (props) => {

    // First we extract only driver as a user
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [status, setStatus] = useState("");
    const [challans, setChallans] = useState("");

    const getUser = async (e: SyntheticEvent) => {
      
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({
                uid: Props.userId,
                pwd: Props.pwd,
                userType: Props.userType
            })
        });

        const content = await response.json();

        setFname(content.FNAME)
        setLname(content.LNAME)
    }
    
    return (
        <div>
            {/* {this.getId() ? "Hi " + props.fname + " " + props.lname : "You are not logged in !!"} */}

            Welcome, {Props.userId} You have successfully logged in as {Props.userType}.

        </div>        
    );
};

export default User;

// Props: {userId : string, userType: string, pwd: string}

// interface Props {
//     userType: string,
//     userId: string
// }

// interface State {
//     userType: string,
//     userId: string
// }

// class User extends React.Component<Props, State> {
//     // State: any;
    
//     constructor(userId: any, userType: any) {
//         super(userId, userType);
//     }

//     getId() {
//         const uid = this.state.userId;
//         return uid;
//     }

//     getType() {
//         const usrTyp = this.state.userType;
//         return usrTyp;
//     }

//     printState() {
//         console.log("The type of user passed is : ", this.getType, "It's Id is :", this.getId)
//     }

//     render() {
//         return (
//             <div>
//                 {/* {this.getId() ? "Hi " + props.fname + " " + props.lname : "You are not logged in !!"} */}

//                 Welcome, {this.props.userId} You have successfully logged in as {this.props.userType}.

//                 {this.printState}

//                 {/* <div onLoad={}>

//                 </div> */}

//             </div>
//         );
//       }
// }

// const User: FunctionComponent = (props) => {

//     useEffect(() => {
        
//         console.log(props.state.first);
//     });
    

//     const intro = () => {
        
//     }

//     return (
//         <div>
//             {/* {props.fname ? "Hi " + props.fname + " " + props.lname : "You are not logged in !!"} */}

//             <div onLoad={intro}>

//             </div>


//         </div>
//     );
// };

// useEffect( () => {
    //     (
    //         async () => {
    //             const response = await fetch('http://localhost:8000/api/user', {
    //                 headers: {"Content-Type": "application/json"},
    //                 credentials: 'include'
    //             });
  
    //             const content = await response.json();
  
    //             (content.FNAME)
    //             (content.LNAME)
    //             // setUId(content.UID)
    //         }
    //     )();
    // });
