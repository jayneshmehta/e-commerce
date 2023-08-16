import React from 'react'
import { AiOutlineSortDescending } from 'react-icons/ai'
import { BsSortAlphaUpAlt } from 'react-icons/bs'
import { FaSortAmountUp, FaSortAmountUpAlt } from 'react-icons/fa'
import $ from 'jquery';
export default function Sortingdiv({setSort}) {

    return (
            <select className="form-select d-inline-block px-3" id='sort'  style={{width:'200px'}} onChange={(e)=>{setSort(e)}}>
            <option value="">Auto</option>
                <optgroup label="Sorting on Price"/>
                    <option value="l2h">Low to high</option>
                    <option value="h2l">High to Low</option>
                <optgroup label="Alphabetical Sorting"/>
                    <option value="a2z">A-Z</option>
                    <option value="z2a">Z-A</option>
            </select>
    )
}
