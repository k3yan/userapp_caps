import React, {useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Carousel } from "@material-tailwind/react";
import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
 import ModalRegister from '../components/ModalRegister';
 import { Footer } from '../components/Footer';
 import {FcGoogle} from 'react-icons/fc'
 import { database, handleLogin } from '../../firebaseConfig';
 import { collection, doc, getDoc } from 'firebase/firestore';
 import { UserContext } from '../data/userData';
import { useState } from 'react';
import LoadingModal from '../components/Loading';
const Home = () => {
  const { currentUser,logout } = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const hasSchoolID = async (currentUser) => {
    try {
      setIsLoading(true);
      if (!currentUser) {
        // currentUser is not available, return false
        return false;
      }

      // Reference to the "Users" collection in Firestore
      const usersCollectionRef = collection(database, 'Users');

      // Get the user's document from the collection using the user's UID
      const userDocRef = doc(usersCollectionRef, currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        // Check if the user document has a schoolID field
        const userData = userDocSnapshot.data();
        
        if (userData && userData.schoolID) {
          if(userData && userData.status == "block"){
            alert("You have been blocked")
            return logout()
          }
          return true; // User has a schoolID
        }
      
      }

      return false; // User does not have a schoolID
    } catch (error) {
      console.error('Error checking for schoolID:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate('/Home');
    }

    const checkSchoolID = async () => {
      const userHasSchoolID = await hasSchoolID(currentUser);
      if (userHasSchoolID) {
        console.log(userHasSchoolID)
        setNewUser(false);
      } else {
        // User does not have a schoolID, you can handle this case as needed
        setNewUser(true);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Hide the loading screen after 1000 milliseconds (1 second)
    };

    if (currentUser) {
      checkSchoolID();
    }else{
      setTimeout(() => {
        setIsLoading(false);
      }, 10000);
    }
  }, [currentUser]);

  return (
    <>
    
    {isLoading &&
      <LoadingModal/>
    }
    <div className="absolute top-0  bottom-0 -z-10  h-screen">
    
       <div className='absolute top-0  bg-black h-screen' >
        <img src='/static/images/LiceoBG.jpg' className="blur-sm object-cover h-screen w-screen bg-black"/>
      <img src='/static/images/libraryBG.jpg' className="blur-sm object-cover  lg:h-[48vh] md:h-[50vh] sm:h-[70vh] h-[80vh] w-screen bg-black"/>
     
      </div>
    <div className='sm:mx-9 md:mx-8 px-2 mt-28 md:h-[32rem] h-[14rem] '>
    <Carousel
    className="rounded-xl mt-3  "
    navigation={({ setActiveIndex, activeIndex, length }) => (
      <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
        {new Array(length).fill("").map((_, i) => (
          <span
            key={i}
            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
            activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
            }`
          }
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    )}
  >
    <img
      src="/static/images/bg7.jpg"
      alt="image 1"
      className="h-full w-full object-cover"
    />
    <img
      src="/static/images/bg1.jpg"
      alt="image 2"
      className="h-full w-full object-cover"
    />
    <img
      src="/static/images/bg4.jpg"
      alt="image 3"
      className="h-full w-full object-cover"
     
    />
      <img
      src="/static/images/bg2.jpg"
      alt="image 3"
      className="h-full w-full object-cover"
     
    />
      <img
      src="/static/images/bg5.jpg"
      alt="image 3"
      className="h-full w-full object-cover"
     
    />
      <img
      src="/static/images/bg3.jpg"
      alt="image 3"
      className="h-full w-full object-cover"
     
    />
      <img
      src="/static/images/bg6.jpg"
      alt="image 3"
      className="h-full w-full object-cover"
     
    />
  </Carousel>
  </div>

  <div className='px-8 w-full flex justify-center '>
  <Card className="mt-6 mr-2 lg:w-[25%] xl:w-[35%] md:w-full sm:w-full w-full gap-y-2 p-4 bg-transparent">
    {currentUser &&
      <ModalRegister user={currentUser} userNew={newUser}/>

    }
      {!currentUser &&
        <Button
        onClick={handleLogin} 
        color='blue' className='flex justify-center gap-2 items-center '>
          <FcGoogle className='w-8 h-8'/>Login
        </Button>
          }
      </Card>
      </div>
    
<div className='px-8 mt-2 w-full flex md:justify-start  sm:justify-center  lg:justify-center'>
  <Card className="mt-6 mr-2 md:w-full sm:w-full lg:w-[75%] " >
      <CardBody >
        <div className='flex justify-center'>
<img src='/static/images/libraryIcon.gif' className='lg:w-20 sm:w-14 w-12 '/>
        </div>
      <p className='lg:text-4xl text-2xl md:text-3xl text-black my-4  text-center'>ELSA P. PELAEZ MEMORIAL LIBRARY</p>
      <Typography className='md:text-justify  text-left'>
        The LIBRARY is indeed the most important intellectual resource in the academic community. It is the place where the teaching-learning process is effectively enhanced and aptly complemented through the use of books, periodicals, journals, and variety of multi-media resources. It is an intellectual center of an academic community – a place for research, thought, and reflection. It significantly plays an indispensable role in accomplishing the educational objectives of Liceo de Cagayan University.
        </Typography>
        <div className='flex justify-center lg:justify-start gap-2'>
          <img src='/static/images/vision.gif' className='w-12 h-12 ' />
        <p className='lg:text-3xl text-black uppercase my-4 lg:text-start text-center sm:text-lg md:text-2xl'>vision</p>
        </div>
        <Typography className='md:text-justify  text-left'>
        Facilitates total human formation through excellent and relevant information services.
</Typography>
<div className='flex justify-center lg:justify-start gap-2'>
  <img src='/static/images/mission.gif' className='w-12 h-12 ' />
<p className='lg:text-3xl text-black uppercase my-4 lg:text-start text-center sm:text-lg md:text-2xl'>mission</p>
</div>
<Typography className='md:text-justify  text-left'>
        Supports the university's commitment to academic excellence, Christian values, research, and extension programs via adequate library resources, facilities, and fast delivery of information service.
</Typography>
      </CardBody>
    </Card>
</div>
<div className='mt-32 z-0 relative '>
<Footer/>
</div>

</div>
</>
  )
}

export default Home;