import { Button } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'

const ChartProducts = ({type}) => {
    const [labels, setLabels] = useState([])
    const [values, setValues] = useState([])
    const [render, setRender] = useState(false);
    const [horizontal, setHorizontal] = useState(false)

    const groupBy = (users, key) => {
        return users.reduce((a, c)=>{
            let groupKey = c[key];
            if(!a[groupKey]) {
                a[groupKey] = [];
            }
            a[groupKey].push(c);
            return a        
        },{})
    }
    
    const getData=()=>{
        axios(`${process.env.REACT_APP_HOST}/api/products/getproducts`,{
            method: 'get',
            headers: {
                "Content-Type" : "application-json",
                "auth-token": localStorage.getItem('token')
            }
        })
        .then((response)=>{
            console.log(response.data);
            setLabels([]);
            setValues([]);
            const result = groupBy(response.data, 'category');
            Object.entries(result).forEach(([key,value])=>{
                //console.log(key, '--', value.length);
                setLabels(current=>[...current, key])
                setValues(current=>[...current, value.length])
            })
            setTimeout(() => {
                setRender(true);
            }, 500);
        })
    }
    useEffect(()=>{
       getData();
       // eslint-disable-next-line
    },[])



    const state = {
          options: {
            xaxis:{
                categories: labels
              },
            title: {
                text: 'Product Categories',
                align: 'center',
                margin: 20,
                offsetY: 20,
                style: {
                    fontColor: "red"
                }
            },
            plotOptions: {
                bar: {
                    horizontal: horizontal
                }
            },
            fill: {
                colors: ['#f44336']
            }
          },
          series: [{
            name: 'Product Count: ',
            data: values
          }],
          dataLabels: {
            enabled: false
          },
          
          
        };
    
  return (
    <div>
        {render && 
        <>
        <Chart 
        options={state.options}
        series ={state.series}
        type={type} />
        <Button onClick={(e)=>setHorizontal(horizontal ? false : true )}>Change State</Button>
        </>
        }
       
    </div>
  )
}

export default ChartProducts
