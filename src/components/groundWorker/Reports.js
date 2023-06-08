import React, {useEffect, useState} from "react";
import {  useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Form,
  FormGroup,
  Col,
  Label,
  Input,
  Button,
} from "reactstrap";
import { getDownloadURL, ref as storageRef, uploadBytes, } from "firebase/storage";
import { database, db, storage } from "../../firebase";
const Report=() => {
	const location = useLocation();
	const [type,setType]=useState(location.pathname.split("/")[5]);
	const [step,setStep]=useState("");
	const [msg, setMsg] = useState("");
	const [newsReportText, setNewsReportText] = useState("");
	const [comments, setComments] = useState("");
  	const [submitted, setSubmitted] = useState(false);
	const [status,setStatus]=useState("Loading");
	const id=location.pathname.split("/")[3];
	const [imageUpload, setImageUpload] = useState(null);
	const mapOfTypes= new Map();
	mapOfTypes.set("newsPaperReport",["Newspaper Report","Step1"]);
	mapOfTypes.set("TVReport",["TV Report","Step2"]);
	mapOfTypes.set("fileMisingReport",["File Missing Report","Step3"]);
	mapOfTypes.set("medicalReport",["Medical Report","Step4"]);
	mapOfTypes.set("siReport",["SI Report","Step5"]);
	useEffect(()=>{
		// const ref = database.ref("childProfile"+`${id}`)
		setType(location.pathname.split("/")[5]);
		setStep(mapOfTypes.get(type)[1])
		database.ref("childProfile/"+`${id}`).on('value',(snapshot)=>{
			setStatus(snapshot.val()[step]);
			setMsg(snapshot.val()["ManagerMessage"])
		})

	},[location])
	const handleSubmitInformation = ((e) => {
		e.preventDefault();
		// const imageRef = storageRef(storage, `documents/${id}/NewsPublicationReport`);
		// uploadBytes(imageRef, imageUpload)
		// 	.then((snapshot) => {
		// 	  getDownloadURL(snapshot.ref).then((url) => {
		// 		db.collection("cases").doc(id).update({
		// 		  "Photo Publication Report": url,
		// 		  "Photo Publication Text": e.target[0].value
		// 		})
		// 	  })
		// 	})

		// 	database.ref("childProfile/"+`${id}`).update({[step] :"In Progress"})
		// 	database.ref("childProfile/"+`${id}`).on('value',(snapshot)=>{
		// 		setStatus(snapshot.val()[step]);
		// 	})

		setSubmitted(true);
	  
	  })

	  const handleSubmitInformation1 = ((e) => {
		e.preventDefault();
			database.ref("childProfile/"+`${id}`).update({"workerMessage" : e.target[0].value})
			// database.ref("childProfile/"+`${id}`).on('value',(snapshot)=>{
			// 	setStatus(snapshot.val()[step]);
			});
	//   })

	const SendComment = (e) => {
        e.preventDefault();
        // Handle submit logic here
        setSubmitted(true);
      };
	return (
    <div className="h-95 w-95 sm:h-9/10 sm:w-2/5 bg-sideBarColor1  rounded-1 ms-3 m-3 sm:m-2 sm:relative drop-shadow-xl shadow-xl opacity-90 hover:shadow-sideBarColor1 hover:opacity-100 sm:block align-items-center justify-content-center overflow-y-scroll">
      <div className="row mt-3 m-2 w-95">
        <div className="col p-0 font-bold text-3xl">
          {" "}
          {mapOfTypes.get(type)[0]}
        </div>
        <div className="col-auto p-0"></div>
        <div className="col-auto p-0 justify-self-end ">
          {" "}
          <div className="w-auto rounded-pill font-medium bg-color2 justify-self-center p-2">
            {" "}
            {status}
          </div>{" "}
        </div>
      </div>

      <div className="row m-2 mt-3 w-95">
        <Card className="my-4">
          <CardBody>
            <CardTitle tag="h5">Event Report:</CardTitle>

            <Form onSubmit={handleSubmitInformation}>
              <FormGroup row>
                <Label for="newsreporttext" sm={2}>
                  Report:
                </Label>
                <div className="col-sm-10">
                  <Input
                    type="textarea"
                    name="newsreporttext"
                    id="newsreporttext"
                    value={newsReportText}
                    onChange={(e) => setNewsReportText(e.target.value)}
                    placeholder="Enter news report text"
                    rows={3}
                  />
                </div>
              </FormGroup>

              <FormGroup row>
                <Label for="image" sm={2}>
                  Files:
                </Label>
                <div className="col-sm-10">
                  <Input
                    type="file"
                    name="image"
                    id="image"
                    onChange={(e) => {
                      setImageUpload(e.target.files[0]);
                    }}
                  />
                </div>
              </FormGroup>

              <Button
                className="bg-color3 border-none text-textcolor"
                type="submit"
              >
                Submit
              </Button>
            </Form>

            {submitted && (
              <div className="mt-4">
                <h6>Your event report has been submitted.</h6>
                {/* Additional logic or message for submitted form */}
              </div>
            )}
          </CardBody>
        </Card>

        <Card className="my-4">
          <CardBody>
            <CardTitle tag="h5">Manager Message:</CardTitle>
            <CardSubtitle className="mb-3">{msg}</CardSubtitle>

            <Form onSubmit={SendComment}>
              <FormGroup>
                <Label for="comments">Comments:</Label>
                <Input
                  type="textarea"
                  name="comments"
                  id="comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Enter your comments"
                  rows={3}
                />
              </FormGroup>

              <Button
                className="bg-color3 border-none text-textcolor"
                type="submit"
              >
                Submit
              </Button>
            </Form>

            {submitted && (
              <div className="mt-4">
                <h6>Your comment has been submitted.</h6>
                {/* Additional logic or message for submitted form */}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Report;
