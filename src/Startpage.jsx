import React, { useState, useRef } from "react";
import "./Startpage.css";

function Startpage() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedStyleButton, setSelectedStyleButton] = useState(null);
  const [selectedLanguageButton, setSelectedLanguageButton] = useState(null);

  const [showLanguageModal, setShowLanguageModal] = useState(false);

  function forceLanguageModal() {
    setShowLanguageModal(true);
  }

  function forceStyleModal() {
    setShowLanguageModal(false);
  }

  const [isUploaded, setIsUploaded] = useState(false);

  let preview;

  const buttons = [
    { id: 1, text: "Presentation" },
    { id: 2, text: "Flyer" },
    { id: 3, text: "Summary" },
    { id: 4, text: "Worksheet" },
    { id: 5, text: "Brochure" },
  ];

  const selectedFormat = buttons.find(
    (button) => button.id === selectedButton
  )?.text;

  const styleButtons = [
    { id: 1, text: "Business" },
    { id: 2, text: "Education" },
    { id: 3, text: "Finance" },
    { id: 4, text: "Aesthetic" },
  ];

  const languageButtons = [
    { id: 1, text: "English" },
    { id: 2, text: "German" },
    { id: 3, text: "Arabic" },
    { id: 4, text: "Spanish" },
  ];

  const handleButtonClick = (id) => {
    setSelectedButton(id);
  };

  const handleStyleButtonClick = (id) => {
    setSelectedStyleButton(id);
  };

  const handleLanguageButtonClick = (id) => {
    setSelectedLanguageButton(id);
  };

  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg", // JPEG images (includes .jpg and .jpeg)
      "text/plain", // Plain text files
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/msword", // .doc
    ];

    if (file && allowedTypes.includes(file.type)) {
      setFileName(file.name);
      setIsUploaded(true);
    } else {
      setFileName("");
      setIsUploaded(false);
    }
  };

  // Trigger file input click
  const handleButtonFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [modalClassName, setModalClassName] = useState("modal");
  const [finishModalClassName, setFinishModalClassName] =
    useState("finishModal");
  const [overlayClassName, setOverlayClassName] = useState("");
  const [finishOverlayClassName, setFinishOverlayClassName] = useState("");

  function toggleModal() {
    if (modalClassName === "modal") {
      setModalClassName("modal modalOpen");
      setOverlayClassName("overlay");
    } else {
      setModalClassName("modal");
      setOverlayClassName("");
    }
  }

  function toggleFinishModal() {
    if (
      isUploaded &&
      selectedStyleButton &&
      selectedButton &&
      selectedLanguageButton
    ) {
      if (finishModalClassName === "finishModal") {
        setFinishModalClassName("finishModal createModalOpen");
        setFinishOverlayClassName("finishOverlay");
      } else {
        setFinishModalClassName("finishModal");
        setFinishOverlayClassName("");
      }
    }
  }

  return (
    <>
      <div className="topContainer">
        <h1 className="topContainerHeading">Locker</h1>
        <button
          onClick={toggleFinishModal}
          className={`topContainerButton createButton ${
            isUploaded &&
            selectedStyleButton &&
            selectedButton &&
            selectedLanguageButton
              ? "active"
              : ""
          }`}
        >
          Create
        </button>
      </div>
      <section id="previewSection">
        <div className="imgContainer">
          <img src="/startingimage.png" alt="Preview" />
        </div>
      </section>
      <section id="footer">
        <div className="formatSelection">
          <h2 className="formatSelectorText">Choose your format</h2>
          <div className="formatSelectorButtonContainer">
            {buttons.map((button) => (
              <div className="buttonCon" key={button.id}>
                <div
                  className={
                    selectedButton === button.id ? "btnConE active" : "btnConE"
                  }
                >
                  <button onClick={() => handleButtonClick(button.id)}>
                    {selectedButton === button.id && <img src="/haken.svg" />}
                  </button>
                </div>
                <p className="buttonConText">{button.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lowerFunctions">
          <input
            type="file"
            accept="application/pdf, image/png, image/jpeg, text/plain, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword" // Accept PDF, PNG, JPG, JPEG, TXT, DOC, and DOCX files
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <div className="uploadButton" onClick={handleButtonFileClick}>
            <div className="svgContainer">
              <img
                src={isUploaded ? "/bluecloud.svg" : "/upload.svg"}
                alt="Upload"
              />
            </div>
            <div className="uploadTextContainer">
              <p className="uploadText">Upload your</p>
              {!isUploaded ? (
                <p className="uploadTextSecond">Document</p>
              ) : (
                <p className="uploadTextSecond uploadedText">{fileName}</p>
              )}
            </div>
            {isUploaded && <img className="hook" src="/haken.svg" />}
          </div>
          <div
            className="uploadButton"
            onClick={() => {
              forceStyleModal();
              toggleModal();
            }}
          >
            <div className="svgContainer styleSvg">
              <img src="/stylesparkles.svg" alt="Style" />
            </div>
            <div className="uploadTextContainer">
              <p className="uploadText">style</p>
              <p className="uploadTextSecond">
                {selectedStyleButton
                  ? styleButtons.find(
                      (button) => button.id === selectedStyleButton
                    ).text
                  : "Choose..."}
              </p>
            </div>
          </div>
          <div
            className="uploadButton languageButton"
            onClick={() => {
              forceLanguageModal();
              toggleModal();
            }}
          >
            <div className="svgContainer svgContainerLang">
              <img src="/lang.svg" alt="Style" />
            </div>
          </div>
        </div>
      </section>
      <div className={overlayClassName} onClick={toggleModal} />
      <div className={modalClassName}>
        <button className="doneButton" onClick={toggleModal}>
          Done
        </button>
        {!showLanguageModal ? (
          <>
            <p className="paragraphHeading">Style</p>
            <p className="styleDes">Choose a style for your presentation.</p>
            <div className="styleSelectorButtonContainer">
              {styleButtons.map((styleButton) => (
                <div className="styleButtonContainer" key={styleButton.id}>
                  <div
                    className={
                      selectedStyleButton === styleButton.id
                        ? "btnConE active"
                        : "btnConE"
                    }
                  >
                    <button
                      onClick={() => handleStyleButtonClick(styleButton.id)}
                    >
                      {selectedStyleButton === styleButton.id && (
                        <img src="/haken.svg" />
                      )}
                    </button>
                  </div>
                  <p className="buttonConText">{styleButton.text}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="paragraphHeading">Language</p>
            <p className="styleDes">Choose a language for your presentation.</p>
            <div className="styleSelectorButtonContainer">
              {languageButtons.map((languageButton) => (
                <div className="styleButtonContainer" key={languageButton.id}>
                  <div
                    className={
                      selectedLanguageButton === languageButton.id
                        ? "btnConE active"
                        : "btnConE"
                    }
                  >
                    <button
                      onClick={() =>
                        handleLanguageButtonClick(languageButton.id)
                      }
                    >
                      {selectedLanguageButton === languageButton.id && (
                        <img src="/haken.svg" />
                      )}
                    </button>
                  </div>
                  <p className="buttonConText">{languageButton.text}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className={finishOverlayClassName} onClick={toggleFinishModal} />
      <div className={finishModalClassName}>
        <button className="closeButton" onClick={toggleFinishModal}>
          <img src="/x.svg" alt="x" />
        </button>
        <div className="imgContainer">
          <img src="./bdrprs.png" alt="Result" />
        </div>
        <p className="firstParagraph">
          Your Presentation <br />
          <span>is ready</span>
        </p>
        <p className="downloadText">Download now</p>
        <button className="downloadButton">
          <img src="/cloud.svg" alt="Download" />
          <p className="downloadText">Download</p>
        </button>
        <p className="downloadDes">
          Your pdf document has been transformed into a brand new presentation.
        </p>
      </div>
    </>
  );
}

export default Startpage;
