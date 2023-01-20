import { Button } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'

const ChartUsers = ({type}) => {
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
        axios('http://localhost:8080/api/admin/users')
        .then((response)=>{
            setLabels([]);
            setValues([]);
            const result = groupBy(response.data.users.rows, 'provider');
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
                text: 'User Providers',
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
                colors: ['#FFA500']
            }
          },
          series: [{
            name: 'User Count: ',
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

export default ChartUsers
