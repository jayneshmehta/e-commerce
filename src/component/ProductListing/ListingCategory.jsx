import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'

export default function ListingCategory({ items, index, sub_category, filter }) {

    const [selectedIndex, setSelectedIndex] = React.useState("")

    const handleClick = index => {
        if (selectedIndex === index) {
            setSelectedIndex("")
        } else {
            setSelectedIndex(index)
        }
    }
    return (
        <div key={index}>
            <ListItemButton id={items.id} onClick={() => { handleClick(index) }} className='my-2 text-capitalize border-bottom border-primary rounded catbtn' >
                <ListItemText primary={items.name} />
                {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            < Collapse in={index === selectedIndex} timeout="auto" >
                <List className='my-2 ps-4 text-capitalize ' component="div" disablePadding>
                    {
                        sub_category.map((item, i) => {
                            return (
                                <ListItemButton id={`list${item.id}`} className='filterlist' key={'list' + i}>
                                    <ListItemText primary={item.Sub_category_Name} onClick={() => { filter(item.id) }} />
                                </ListItemButton>
                            )
                        })
                    }
                </List>
            </Collapse>
        </div>
    )
}
