import React,{useState,useEffect} from "react";

import './App.css';


function App() {
  
    const[data,setData]=useState([]) 
    const[allData,setAllData]=useState([])
    const [cartItems,removeShoppingCart] =useState([]);
    const [allsearch, setAllsearch] = useState("")

    const getData=async()=>{
      const response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
      const Result=await response.json();
      setData(Result.meals)
      console.log(data)
    }
    const searchFunction =!allsearch ? data:data.filter((item)=>
      item.strMeal.toLowerCase().includes(allsearch.toLowerCase()) || item.strCategory.toLowerCase().includes(allsearch.toLowerCase())
    )
    const TotalItem=cartItems.reduce((accum,value)=>{
      return (value.count*100+accum)
    },0)
    useEffect(()=>{
      getData()
      console.log(data)
    },[])
    
  return (
    <div>
      
    <div id="subbox">
      
        <img id="img" src="https://www.themealdb.com/images/logo-small.png" alt="" />
        <h1 style={{color:"white",marginLeft:"450px"}}>Welcome to TheMealDB</h1>
        <p style={{marginLeft:"300px",color:"white"}}>Welcome to TheMealDB: An open, crowd-sourced database of Recipes from around the world.</p>
        <p style={{marginLeft:"280px",color:"white"}}>We also offer a <span style={{color:"red"}}>free JSON API</span> for anyone wanting to use it, with additional features for subscribers.</p>
        
        <img id="img2" src="https://www.themealdb.com/images/meal-icon.png" alt="" />
        <img id="img3" src="https://www.themealdb.com/images/meal-icon.png" alt="" />
        <input id="search" value={allsearch} style={{color:"red",background:"lightgrey"}}  type="search" placeholder='Search Here...' onChange={(e) => {
          setAllsearch(e.target.value)
          
        }} />
      <button id="search1">search</button>
    <div className="App">
       

      {
        searchFunction.map((item,index)=>{
          return(
            <div  key={index}>
             
              {/* <h3>{item.idMeal}</h3> */}
            <img id="img1" src={item.strMealThumb} /><br></br>

              <h3 style={{color:"yellow"}}>{item.strMeal}</h3>
              <h3 style={{color:"yellow"}}>Rs.100</h3>
              
              <button id="submit" onClick={()=>{
               let tempObj={
                strMeal:item.strMeal,
                strMealThumb:item.strMealThumb,
                cost:100
                
            }
            console.log(tempObj)
            setAllData([...allData,tempObj])
            console.log(allData)
            
            }}>AddtoCart</button>

            

            </div>
          )
        })
      }
    </div>
    </div>
    <div><center><h1>AddtoCart</h1></center></div>

    {
              allData.map((item,index)=>{
                return(
                 
                  <div>
                    <center>
                      <table>
                      
                  
                <td><img id="img5" src={item.strMealThumb} /></td>
                    
                <td><h2>Item: {item.strMeal }</h2></td>
                
                <td><h2>Rs.{item.cost}</h2></td>
                
                </table>
                </center>

                  </div>
                )

              })
            }
            <div id="total"><h1>Total price: {allData.length*100}</h1></div>
    </div>
  );
}

export default App;
