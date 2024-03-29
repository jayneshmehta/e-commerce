import React, { useEffect, useState } from 'react'
import ListingCategory from './ListingCategory';
import axios from 'axios';
import env from "react-dotenv";

export default function FilterByProduct({filter}) {
    const [category, setCategory] = useState([])
    var baseURL1 = env.API_URL+'categorys';
    useEffect(() => {
        axios.get(baseURL1).then((response1) => {
            setCategory(response1.data);
        });
    }, []);

    const [sub_category, setSub_Category] = useState([])
    var baseURL2 = env.API_URL+'sub_category';
    useEffect(() => {
        axios.get(baseURL2).then((response2) => {
            setSub_Category(response2.data);
        });
    }, [category]);
    return (
        <div>
            {category.map((items, index) => {
                var subcategorys = sub_category.filter((subData) => {
                    if (items.id == subData.category_id) {
                        return subData;
                    }
                })
                return (
                    <ListingCategory items={items} sub_category={subcategorys} index={index} key={index} filter={filter} />
                )
            })
            }
        </div>
    )
}
