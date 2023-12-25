import { useEffect } from "react"
import axios from 'axios'
import { redirect } from "react-router-dom";


const Restaurants = () => {

    useEffect(() => {


      async function fetchRestaurants() {

        try {
          const result = await axios.get('http://localhost:8080/restaurant/all');
          // await console.log("Status", result.status);
          if (result.status < 200){
            // return redirect('/login')
            const response = redirect("http://localhost:5173/login")
// response.body = true  // It's silly, but it works
return response
          } 
            
      } catch (error) {
          console.error("Error making the request:", error.message);
          return redirect("/login");
      }

        // console.log(result)
      }
  fetchRestaurants()
    }, [])
    
  

  return (
    <div>This is are all the Restaurants</div>
  )
}

export default Restaurants