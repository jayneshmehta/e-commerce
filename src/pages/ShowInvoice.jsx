import React from 'react'
import Invoice from '../Invoice'
import html2pdf from 'html2pdf.js/dist/html2pdf.min';
import ReactDOMServer from 'react-dom/server';
import { AiOutlineDownload } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';

export default function ShowInvoice() {
    const location = useLocation();
    let data = location.state;
    var opt = {
        filename: 'Invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
    };
    const pdfJSX = () => {
        return (
            <Invoice data={data} />
        )
    }

    const printHandler = () => {
        const printElement = ReactDOMServer.renderToString(pdfJSX());
        html2pdf().set(opt).from(printElement).save();
    }

    return (
        <div>
            <div className='container'>
                <Invoice data={data} />
                <div className="row justify-content-end">
                    <button className="col-2 btn btn-danger" onClick={() => printHandler()}>Generate Invoice <span className='fw-bolder fs-5'><AiOutlineDownload /></span></button>
                </div>
            </div>
        </div>
    )
}
