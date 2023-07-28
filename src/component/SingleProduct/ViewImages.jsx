import React from 'react'
import $ from 'jquery';
export default function ViewImages({images,thumbnail}) {

    $(document).on("click",".allimages",function(){
        $('#thumbnail').attr("src",this.src);
    })  

    

    return (
        <>
            <div className='border p-2 rounded'>
                <img src={thumbnail} className='h-100 img-fluid' id='thumbnail' style={{ maxHeight: '400px', minHeight: '400px', width: '400px' }} alt="" />
            </div>
            <div className='mt-2 d-flex py-3 gap-2 overflow-auto  '>
                {   
                    images.map((items, index) => {
                        if(items == ""){
                            return "";
                        }
                        return (
                            <div className=''key={index}>
                                <img className='border p-1 rounded allimages'   src={items} alt={"img" + index} style={{ width: '80px', height: "80px" }} ></img>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
