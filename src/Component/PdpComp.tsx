import { useState, useRef, useEffect } from "react";
import { Writer } from "@writerai/writer-sdk";

// const inputText = `1. Get ready to charge up in a flash with the EcoDrive Electric Vehicle Charger. This high-powered charger quickly and efficiently recharges your electric vehicle. You can also use the mobile app to start, stop, and schedule charging sessions remotely. Plus, the app also tracks your energy consumption and costs so you can stay informed on your usage. Get ready to charge up in a jiffy with the EcoDrive Electric Vehicle Charger.

// 2. Make charging your electric vehicle a breeze with the EcoDrive Electric Vehicle Charger. This advanced charger is designed to charge your vehicle quickly and efficiently. You can also monitor your electricity consumption with the mobile app, which allows you to start, stop, and schedule charging sessions remotely. Save time and money with the EcoDrive Electric Vehicle Charger.

// 3. Save time and money with the EcoDrive Electric Vehicle Charger. Perfect for the modern driver, this charger quickly and efficiently recharges your electric vehicle. You can also control charging sessions remotely using the mobile app, which also keeps track of your energy consumption and costs. Get ready to hit the road with the EcoDrive Electric Vehicle Charger.`;

// const inputText2 = `Variation 1:
// For those who love fresh, organic fruit, look no further than Mango. This sweet, juicy, and delicious fruit is a great addition to any meal or snack. Whether you're looking for a healthy snack or a burst of flavor to add to your favorite recipes, Mango is the perfect choice. The perfect combination of sweet and tart, Mango is a great source of vitamins and minerals. Enjoy it on its own, in smoothies, salads, or your favorite desserts.

// Variation 2:

// Experience the sweet, juicy flavor of Mango. This delicious, organic fruit is the perfect addition to any meal or snack. Not only is Mango packed with vitamins and minerals, but it also adds just the right amount of flavor and sweetness to your favorite recipes. Enjoy it on its own, as a snack, or add it to smoothies, salads, and desserts. For a delicious and nutritious treat, look no further than Mango.

// Variation 3:

// Make your meals and snacks a little sweeter with Mango. This organic, juicy, and delicious fruit is packed with vitamins and minerals, and adds a burst of flavor to your favorite recipes. Whether you're looking for a healthy snack or something to add to your smoothie, salad, or dessert, Mango is the perfect choice. Treat yourself to the sweet, tart flavor of Mango today.`;

// const inputText3 = `1). Get ready to charge up in a flash with the EcoDrive Electric Vehicle Charger. This high-powered charger quickly and efficiently recharges your electric vehicle. You can also use the mobile app to start, stop, and schedule charging sessions remotely. Plus, the app also tracks your energy consumption and costs so you can stay informed on your usage. Get ready to charge up in a jiffy with the EcoDrive Electric Vehicle Charger.

// 2). Make charging your electric vehicle a breeze with the EcoDrive Electric Vehicle Charger. This advanced charger is designed to charge your vehicle quickly and efficiently. You can also monitor your electricity consumption with the mobile app, which allows you to start, stop, and schedule charging sessions remotely. Save time and money with the EcoDrive Electric Vehicle Charger.

// 3). Save time and money with the EcoDrive Electric Vehicle Charger. Perfect for the modern driver, this charger quickly and efficiently recharges your electric vehicle. You can also control charging sessions remotely using the mobile app, which also keeps track of your energy consumption and costs. Get ready to hit the road with the EcoDrive Electric Vehicle Charger.`;

// const inputText4 = `Version 1: For the 30- or 40-something who wants to make a statement, the Eco Alto 500 is the perfect electric car. This stylish electric car will turn heads with its sleek design and variety of color options. But the features don't stop there. The Eco Alto 500 is also incredibly efficient, boasting 1000 km on a single charge and 500 horse power. Make a statement and go green with the Eco Alto 500. Version 2: Eco Alto 500 is the perfect luxury electric car for the social upper-class. Not only is this stylish car available in a variety of colors, it is also incredibly efficient. With 1000km in one charge and 500 horse power, the Eco Alto 500 is sure to impress. This electric car is the perfect way to make a statement while still being conscious of the environment. Version 3: If you're looking for a luxury electric car that will make a statement, the Eco Alto 500 is the perfect choice. Not only does this car have a sleek and stylish design, but it is also incredibly efficient. With 1000km in one charge and 500 horse power, the Eco Alto 500 is sure to turn heads. Plus, it comes in a variety of colors, so you can find the perfect one for you. Make a statement and go green with the Eco Alto 500.`;

// const inputText5 = `1) Get ready to charge up in a flash with the EcoDrive Electric Vehicle Charger. This high-powered charger quickly and efficiently recharges your electric vehicle. You can also use the mobile app to start, stop, and schedule charging sessions remotely. Plus, the app also tracks your energy consumption and costs so you can stay informed on your usage. Get ready to charge up in a jiffy with the EcoDrive Electric Vehicle Charger.

// 2) Make charging your electric vehicle a breeze with the EcoDrive Electric Vehicle Charger. This advanced charger is designed to charge your vehicle quickly and efficiently. You can also monitor your electricity consumption with the mobile app, which allows you to start, stop, and schedule charging sessions remotely. Save time and money with the EcoDrive Electric Vehicle Charger.

// 3) Save time and money with the EcoDrive Electric Vehicle Charger. Perfect for the modern driver, this charger quickly and efficiently recharges your electric vehicle. You can also control charging sessions remotely using the mobile app, which also keeps track of your energy consumption and costs. Get ready to hit the road with the EcoDrive Electric Vehicle Charger.`;

// const sentences = inputText4
// .split(/\d+\)\. |Variation [1-3]+\: |\d+\./)
// .replace(/\s+$/, "")
// .split(/(?:Variation [1-5]: )|(?:[1-5]\)\. )/)
// .split(
//   /[1-5]+(?:\)|\)\.) |(?:Variation|Version) [1-5]+(?::\s|\s)|[1-5]+\.\s/g
// )
// .split(/Variation [1-3]:/g)
// .filter(Boolean);

// console.log(sentences);

const resultArray: { id: number; content: string | undefined }[] = [];

function PdpComp() {
  const [pname, setPname] = useState<string>("");
  const [pfeature, setPfeature] = useState<string>("");
  const [pseo, setPseo] = useState<string>("");
  const [pdetails, setPdetails] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadContent, setLoadContent] = useState({
    content: false,
    summary: false,
  });
  const [pimage, setPimage] = useState<string>("");
  const [contentList, setContentList] = useState<string[]>([]);
  const [error, setError] = useState({
    errorName: false,
    errorFeature: false,
    errorDetails: false,
  });
  const [showContentList, setShowContentList] = useState(false);

  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const featureRef = useRef<HTMLInputElement | null>(null);
  const detailRef = useRef<HTMLTextAreaElement | null>(null);

  const writerSdk = new Writer({
    security: {
      apiKey:
        "dC-RBb88hG21lPRlg4WiO_N_R4sIID8814XlSciCRSB29pE4bbradFQ_iBqdj49SmPepGsrbqzeJ1nCC2sb8qBJ3n-gysz8bq-xRTvk7J8Z2W_f3pUcNsOhCPQXNLOis",
    },
    organizationId: 612269,
  });

  useEffect(() => {
    const val = detailRef.current as HTMLTextAreaElement;
    if (val?.style) {
      val.style.height = "auto";
      val.style.height = val.scrollHeight - 20 + "px";
    }
  }, [pdetails]);

  const handleValidation = (type: string) => {
    if (type === "content") {
      if (pname !== "" && pfeature !== "") {
        generatePdpContent();
      } else {
        if (pname === "" && pfeature === "") {
          setError({
            ...error,
            errorName: true,
            errorFeature: true,
          });
          nameRef.current?.focus();
        } else if (pname === "") {
          setError({
            ...error,
            errorName: true,
          });
          nameRef.current?.focus();
        } else if (pfeature === "") {
          setError({
            ...error,
            errorFeature: true,
          });
          featureRef.current?.focus();
        }
      }
    } else if (type === "summary") {
      if (pdetails !== "") {
        summarizeContent();
      } else {
        setError({
          ...error,
          errorDetails: true,
        });
        detailRef.current?.focus();
      }
    }
    return true;
  };

  const convertStringtoArray = (text: string) => {
    return text
      .split(
        /[1-5]+(?:\)|\)\.) |(?:Variation|Version) [1-5]+(?::\s|\s)|[1-5]+\.\s/g
      )
      .filter(Boolean);
  };
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "pname") {
      setPname(e.target.value);
      error.errorName && setError({ ...error, errorName: false });
    } else if (e.target.name === "pfeature") {
      setPfeature(e.target.value);
      error.errorFeature && setError({ ...error, errorFeature: false });
    } else if (e.target.name === "pseo") {
      setPseo(e.target.value);
    } else if (e.target.name === "pdetails") {
      setPdetails(e.target.value);
      error.errorDetails && setError({ ...error, errorDetails: false });
    }
  };

  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { files } = target;

    if (files && files[0]) {
      var reader = new FileReader();

      reader.onloadstart = () => setIsLoading(true);

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imgData = event?.target?.result as string;
        setPimage(imgData?.toString());
        setIsLoading(false);
      };

      reader.readAsDataURL(files[0]);
    }
  };

  const handleImageChange = () => {
    imgInputRef.current?.click();
  };

  const generatePdpContent = () => {
    setLoadContent({ ...loadContent, content: true });
    writerSdk.coWrite
      .generateContent({
        generateTemplateRequest: {
          inputs: [
            {
              value: [`${pname}`],
              name: "Product name",
            },
            {
              value: [`${pfeature} ${pseo}`],
              name: "Product features",
            },
          ],
          templateId: "c019dd70-2fe9-4df6-b5a5-1a51cad21724",
        },
        organizationId: 612269,
        teamId: 619221,
      })
      .then((res) => {
        if (res.statusCode == 200) {
          let val = res.draft?.body;
          console.log("rprops response ==> ", { id: 1, content: val });
          resultArray.push({ id: 1, content: val });
          const listArr = convertStringtoArray(val as string);
          setContentList(listArr);
          setShowContentList(true);
        }
        setLoadContent({ ...loadContent, content: false });
      })
      .catch((error) => {
        console.log("rprops error ==> ", error);
        setLoadContent({ ...loadContent, content: false });
      });
  };

  const summarizeContent = () => {
    setLoadContent({ ...loadContent, summary: true });
    writerSdk.coWrite
      .generateContent({
        generateTemplateRequest: {
          inputs: [
            {
              value: [`${pdetails}`],
              name: "Text",
            },
            {
              value: ["5"],
              name: "Number of bullets",
            },
          ],
          templateId: "4a283c8a-d226-43c0-9ae0-8c9a9d5157c9",
        },
        organizationId: 612269,
        teamId: 619221,
      })
      .then((res) => {
        if (res.statusCode == 200) {
          let val = res.draft?.body;
          setPdetails(val);
        }
        setLoadContent({ ...loadContent, summary: false });
      })
      .catch((error) => {
        console.log("rprops error ==> ", error);
        setLoadContent({ ...loadContent, summary: false });
      });
  };

  // const testGrammer = async () => {
  // writerSdk.content
  //   .check({
  //     contentRequest: {
  //       content: "cum",
  //       settings: {
  //         ageAndFamilyStatus: false,
  //         confidence: false,
  //         contentSafeguards: false,
  //         disability: false,
  //         genderIdentitySensitivity: false,
  //         genderInclusiveNouns: false,
  //         genderInclusivePronouns: false,
  //         grammar: false,
  //         healthyCommunication: false,
  //         passiveVoice: false,
  //         raceEthnicityNationalitySensitivity: false,
  //         sexualOrientationSensitivity: false,
  //         spelling: false,
  //         substanceUseSensitivity: false,
  //         unclearReference: false,
  //         wordiness: false,
  //       },
  //     },
  //     teamId: 619221,
  //   })
  //   .then((res: ContentCheckResponse) => {
  //     if (res.statusCode == 200) {
  //       // handle response
  //       console.log("Check Response ==> ", res);
  //     }
  //   });
  //   writerSdk.content
  //     .check({
  //       contentRequest: {
  //         content: `${pdetails}`,
  //         settings: {
  //           grammar: true,
  //           spelling: true,
  //           contentSafeguards: true,
  //           ageAndFamilyStatus: false,
  //           confidence: false,
  //           disability: false,
  //           genderIdentitySensitivity: false,
  //           genderInclusiveNouns: false,
  //           genderInclusivePronouns: false,
  //           healthyCommunication: false,
  //           passiveVoice: false,
  //           raceEthnicityNationalitySensitivity: false,
  //           sexualOrientationSensitivity: false,
  //           substanceUseSensitivity: false,
  //           unclearReference: false,
  //           wordiness: false,
  //         },
  //       },
  //       organizationId: 612269,
  //       teamId: 619221,
  //     })
  //     .then((res) => {
  //       console.log("CheckRes ==> ", res);
  //     })
  //     .catch((error) => {
  //       console.log("CheckRes error ==> ", error);
  //     });
  // };

  const handleContentSelect = (content: string) => {
    setPdetails(content);
    setShowContentList(false);
  };

  return (
    <>
      <div className="pdpcomp">
        <div className="container">
          <div className="pdpcomp__wrapper">
            <div className="pdpcomp__imageblock">
              {!pimage && (
                <label htmlFor="pimage">
                  {isLoading ? "Loading Image" : "Add Product Image"}
                </label>
              )}
              <input
                id="pimage"
                type="file"
                accept="image/*"
                onChange={handleImageInput}
                ref={imgInputRef}
              />
              {pimage && (
                <>
                  <img src={pimage} alt="Product Image" />
                  <button onClick={handleImageChange}>Change Image</button>
                </>
              )}
            </div>
            <div className="pdpcomp__content">
              <label htmlFor="pname">Product Name</label>
              <input
                name="pname"
                id="pname"
                placeholder="Product Name"
                onChange={handleInput}
                ref={nameRef}
              />
              {error.errorName && (
                <span className="error">! Please enter product name</span>
              )}
              <label htmlFor="pfeature">Product Features</label>
              <input
                name="pfeature"
                id="pfeature"
                placeholder="Product Features"
                onChange={handleInput}
                ref={featureRef}
              />
              {error.errorFeature && (
                <span className="error">! Please enter product features</span>
              )}
              <label htmlFor="pseo">Product Seo Keywords</label>
              <input
                name="pseo"
                id="pseo"
                placeholder="Product Seo Keywords"
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="pdpcomp__details">
            <div className="pdpcomp__textareaInput">
              <label htmlFor="pdetails">Product Description</label>
              {loadContent.summary && (
                <p className="pdpcomp__desctitle">Loading product summary...</p>
              )}
              {showContentList && (
                <>
                  <p className="pdpcomp__desctitle">
                    Select Description from below suggestions :
                  </p>
                  {contentList.map((sentence, index) => {
                    return (
                      <div
                        key={index}
                        className="pdpcomp__desclist"
                        onClick={() => handleContentSelect(sentence)}
                      >
                        {index + 1}.<p>{sentence}</p>
                      </div>
                    );
                  })}
                </>
              )}
              {!showContentList && (
                <>
                  <textarea
                    name="pdetails"
                    id="pdetails"
                    placeholder={
                      loadContent.content
                        ? "Loading product description..."
                        : "Product Description"
                    }
                    value={pdetails}
                    onChange={handleInput}
                    ref={detailRef}
                    style={{ overflow: "hidden" }}
                  />
                  {error.errorDetails && (
                    <span className="error">
                      ! Please enter product description
                    </span>
                  )}
                </>
              )}
            </div>
            <div className="pdpcomp__actionbtns">
              <button
                className="btn-primary"
                onClick={() => handleValidation("content")}
                disabled={loadContent.content}
              >
                {"Genrate Content"}
              </button>
              {/* <button className="btn-primary">Check Content</button> */}
              <button
                className="btn-primary"
                onClick={() => handleValidation("summary")}
                disabled={loadContent.summary}
              >
                {"Generate Summary"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PdpComp;
