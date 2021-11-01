import React, { useState, useEffect } from 'react'
import axios from 'axios'

const IngredientForm = () => {
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState(allData);
    const handleSearch = async (event) => {
        const value = event.target.value;
        const { data } = await axios.get("/api/food/" + value);
        console.log(data);
        setFilteredData(data);
    };
    
    useEffect(() => {
        axios("https://jsonplaceholder.typicode.com/albums/1/photos")
          .then((response) => {
            console.log(response.data);
            setAllData(response.data);
            setFilteredData(response.data);
          })
          .catch((error) => {
            console.log("Error getting fake data: " + error);
          });
    }, []);

    return (
        <div>
            <label>재료</label>
            <input 
                type="text"
                placeholder="예)양파"
                onChange={(event) => handleSearch(event)}
            />
            <div>
                {filteredData.map((value, index) => {
                    return (
                        // 검색 리스트 출력
                        <div key={value.id}>
                            {value.name}
                            {value.mfr}
                        </div>
                    );
                })}
            </div>

            <label>양</label>
            <input type="text" placeholder="예)100" />

            <label>단위</label>
            <select>
                <option value="g">g</option>
                <option value="ml">ml</option>
            </select>
            <button type="button">추가</button>
        </div>
    );
}

export default IngredientForm
