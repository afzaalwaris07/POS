import React from "react";
import {Component} from "react";
import jsPDF from "jspdf";
//import { AlignCenter } from "react-bootstrap-icons";
//import { render } from "@testing-library/react";
//import { TextCenter } from "react-bootstrap-icons";
//import officeLogo from '../assets/office-logo-Icon.png';

export class PdfViewer extends Component{
    //initialize constructor
    constructor (props){
        super(props)
        this.state = {

        }
    }

    PdfGenerate = () => {
        var qr = new Image(); qr.src = "Images/QrCode.png"
        var logo = new Image(); logo.src = "Images/OmbLogo.png"
        
        var doc = new jsPDF('p','px', 'legal');
        
        
        doc.addImage(qr, 'JPEG', 20, 20, 60,60);
        doc.addImage(logo, 'JPEG', 200, 20, 60,60);
        doc.setFont("","",0).setFontSize(12).text("ECFH75DFJHJKU6R4DGJ7",420,80,{align:"right"});
        doc.setFont("","bold",0).setFontSize(18).text("OFFICE OF THE OMBUDSMAN PUNJAB", 230,95,{align:"center"});
        doc.setFont("","",0).setFontSize(10).text(["Jahaz Chowk, DC Complex, Opp. ADC(Rev) Office, Mianwali","Phone No: 045-9920122","Fax No: 045-9920122","Email: mianwali@ombudsmanpunjab.gov.pk"],230,105,{align:"center"});
        doc.setFont("","",0).setFontSize(12).text(["TOP PRIORITY","URGENT","TIME LIMIT"],60,145,{align:"center"});
        doc.setFont("","",0).setFontSize(12).text(["2nd-Notice"],420,155,{align:"right",baseline:"ideographic"});
        doc.setFont("","",700).setFontSize(18).text(["NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING","","","","","","NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING","","","","","","","","NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING","","","","NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING","NOTICE FOR JOINT HEARING"], 230,180,{align:"center"});
        doc.addPage('p','px','legal'); 



        doc.setFont('Times New Roman')





        doc.save('Abc.pdf')


    }

    render() {
        return(
            <button type="button" className="btn btn-primary " onClick={this.PdfGenerate}>Download PDF</button>
        )
    }



} 



