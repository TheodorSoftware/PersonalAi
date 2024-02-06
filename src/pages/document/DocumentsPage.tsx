import React, { useState } from "react"
import DocumentPageProps from "./DocumentPageProps";
import "./DocumentsPage.scss"

const DocumentPage = (props: DocumentPageProps) => {

    const [documents, setDocuments] = useState(null);
    
    function addDocumentHandler() {

    }

    return (
        <React.Fragment>
            <div className="document">
                {
                    documents ?  
                    <></>
                    :
                    <React.Fragment>
                        <label  htmlFor="add-document-button" className="document__add-docuement__label"> Add Document + </label>
                        <input id="add-document-button" type="file" onClick={addDocumentHandler} className="document__add-document"/> 
                    </React.Fragment>
                }
            </div>
        </React.Fragment>
    )
};

export default DocumentPage;