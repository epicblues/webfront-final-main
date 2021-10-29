import React from 'react'
import { useForm } from 'react-hook-form'

const initialValues = {
    igr_array: []
}

const IngredientForm = () => {
    const { register, watch } = useForm();
    let searchVal = watch();
    console.log(searchVal)

    return (
        <div>
            <form>
                <label>재료</label>
                <input 
                    type="text"
                    placeholder="예)양파"
                    {...register("InputVal")}
                />

                <label>양</label>
                <input type="text" placeholder="예)100" />

                <label>단위</label>
                <select>
                    <option value="g">g</option>
                    <option value="ml">ml</option>
                </select>
                <button type="button">추가</button>
            </form>
        </div>
    )
}

export default IngredientForm
