import { useState } from "react";
import { Writer } from "@writerai/writer-sdk";
import {
  ContentCheckResponse,
  ListTemplatesResponse,
} from "@writerai/writer-sdk/dist/sdk/models/operations";

function TestComp() {
  const writerSdk = new Writer({
    security: {
      apiKey:
        "lRVyTwD7auRbU7zq4ACWmhtQJTDD0WKMYPumnk4zcAjysoLTHXCYbJISuHReOjtLvizxm-cAX5_ZtkuKg-0a72ilFXrAhLmGEhkkvD_6kjYSJzzfMu4ym8WwrWn5A0x4",
    },
    organizationId: 602312,
  });

  const content =
    "In the heart of a bustling city life moves at an incredible pace. People rush to and fro, chasing their dreams, their aspirations, and their responsibilities. Tall skyscrapers loom above, casting long shadows on the busy streets below. The symphony of car horns, footsteps, and conversation creates a cacophony that defines urban life.Amidst this chaos, there are moments of tranquility, Parks and green spaces offer an oasis of calmnesds, a place to escape from the relentless energy of the city. Trees sway gently in the breeze, and birds sing their melodious songs, creating a natural orchestra that provides solace to those seeking respite.Every corner of the city tells a story. Historic buildings, with their intricate architecture, stand as a testament to the past. Modern structures, with their sleek lines and innovative designs, represent the future. Street vendors offer a taste of the world through their culinary creations, while local artists express their creativity through colorful murals that adorn the walls.The diversity of the city is its strength. People from different backgrounds, cultures, and walks of life come together to create a vibrant tapestry of experiences. They celebrate their differences, sharing traditions, cuisines, and languages, making the city a truly global melting pot.As the day turns into night, the city undergoes a transformation. Neon signs illuminate the streets, turning the urban landscape into a dazzling display of colors. Restaurants and cafes come alive, offering a variety of cuisines to satisfy every palate. The nightlife pulses with energy as clubs and bars fill with revelers dancing to the rhythm of music.But within this vibrant tapestry, there are also challenges. Homelessnessess, poverty and and inequality persist, serving as a reminder that not everyone enjoys the same opportunities. Activists and advocates work tirelessly to address these issues, striving to make the city a better place for all its residents.In the end, a city is more than just concrete and steeel; its a living, breathing entity. It's a place where dreams are pursued, friendships are forged, and memories are created. It's a place where the past and the future coexist, where diversity is celebrated, and where the human spirit perseveres.And so, in the heart of this bustling cities life continues its relentless march forward, with each day bringing new possibilities, new challenges, and new adventures.";

  // console.log("tsetse", writerSdk);

  const [pname, setPname] = useState("");
  const [pdetail, setPdetail] = useState("");
  const [pcontent, setPcontent] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     testContent();
  //   }, []);

  const testContent = () => {
    setIsLoading(true);
    writerSdk.coWrite
      .generateContent({
        generateTemplateRequest: {
          inputs: [
            {
              value: [`e.g.,${pname}`],
              name: "Product name",
            },
            {
              value: [`e.g.,  ${pdetail} `],
              name: "Product features",
            },
          ],
          templateId: "c019dd70-2fe9-4df6-b5a5-1a51cad21724",
        },
        organizationId: 602312,
        teamId: 609241,
      })
      .then((res) => {
        if (res.statusCode == 200) {
          let val = res.draft?.body;
          setPcontent(val);
        }
        console.log("rprops", res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("rprops error ==> ", error);
      });
  };

  const summarizeContent = () => {
    setIsLoading(true);
    writerSdk.coWrite
      .generateContent({
        generateTemplateRequest: {
          inputs: [
            {
              value: [`${content}`],
              name: "Text",
            },
            {
              value: ["5"],
              name: "Number of bullets",
            },
          ],
          templateId: "4a283c8a-d226-43c0-9ae0-8c9a9d5157c9",
        },
        organizationId: 602312,
        teamId: 609241,
      })
      .then((res) => {
        if (res.statusCode == 200) {
          let val = res.draft?.body;
          setPcontent(val);
        }
        console.log("rprops", res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("rprops error ==> ", error);
        setIsLoading(false);
      });
  };

  const testGrammer = async () => {
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
    //     teamId: 609241,
    //   })
    //   .then((res: ContentCheckResponse) => {
    //     if (res.statusCode == 200) {
    //       // handle response
    //       console.log("Check Response ==> ", res);
    //     }
    //   });
    // writerSdk.content
    //   .check({
    //     contentRequest: {
    //       content:
    //         "In the heart of a bustling city life moves at an incredible pace. People rush to and fro, chasing their dreams, their aspirations, and their responsibilities. Tall skyscrapers loom above, casting long shadows on the busy streets below. The symphony of car horns, footsteps, and conversation creates a cacophony that defines urban life.Amidst this chaos, there are moments of tranquility, Parks and green spaces offer an oasis of calmnesds, a place to escape from the relentless energy of the city. Trees sway gently in the breeze, and birds sing their melodious songs, creating a natural orchestra that provides solace to those seeking respite.Every corner of the city tells a story. Historic buildings, with their intricate architecture, stand as a testament to the past. Modern structures, with their sleek lines and innovative designs, represent the future. Street vendors offer a taste of the world through their culinary creations, while local artists express their creativity through colorful murals that adorn the walls.The diversity of the city is its strength. People from different backgrounds, cultures, and walks of life come together to create a vibrant tapestry of experiences. They celebrate their differences, sharing traditions, cuisines, and languages, making the city a truly global melting pot.As the day turns into night, the city undergoes a transformation. Neon signs illuminate the streets, turning the urban landscape into a dazzling display of colors. Restaurants and cafes come alive, offering a variety of cuisines to satisfy every palate. The nightlife pulses with energy as clubs and bars fill with revelers dancing to the rhythm of music.But within this vibrant tapestry, there are also challenges. Homelessnessess, poverty and and inequality persist, serving as a reminder that not everyone enjoys the same opportunities. Activists and advocates work tirelessly to address these issues, striving to make the city a better place for all its residents.In the end, a city is more than just concrete and steeel; its a living, breathing entity. It's a place where dreams are pursued, friendships are forged, and memories are created. It's a place where the past and the future coexist, where diversity is celebrated, and where the human spirit perseveres.And so, in the heart of this bustling cities life continues its relentless march forward, with each day bringing new possibilities, new challenges, and new adventures.",
    //       settings: {
    //         grammar: true,
    //         spelling: true,
    //         contentSafeguards: true,
    //         ageAndFamilyStatus: false,
    //         confidence: false,
    //         disability: false,
    //         genderIdentitySensitivity: false,
    //         genderInclusiveNouns: false,
    //         genderInclusivePronouns: false,
    //         healthyCommunication: false,
    //         passiveVoice: false,
    //         raceEthnicityNationalitySensitivity: false,
    //         sexualOrientationSensitivity: false,
    //         substanceUseSensitivity: false,
    //         unclearReference: false,
    //         wordiness: false,
    //       },
    //     },
    //     organizationId: 602312,
    //     teamId: 609241,
    //   })
    //   .then((res) => {
    //     console.log("CheckRes ==> ", res);
    //   })
    //   .catch((error) => {
    //     console.log("CheckRes error ==> ", error);
    //   });
    writerSdk.coWrite
      .listTemplates({
        teamId: 609241,
        templateId: "products",
      })
      .then((res: ListTemplatesResponse) => {
        if (res.statusCode == 200) {
          // handle response
          console.log("CheckRes error ==> ", res);
        }
      });
  };

  return (
    <div className="container">
      TestComp
      <div className="testform">
        <label htmlFor="pname">Product Name</label>
        <input
          type="text"
          name="Product Name"
          id="pname"
          onChange={(e) => {
            let val = e.target.value;
            setPname(val);
          }}
        />
        <label htmlFor="pdetail">Product Feature</label>
        <input
          type="text"
          name="Product Detail"
          id="pdetail"
          onChange={(e) => {
            let val = e.target.value;
            setPdetail(val);
          }}
        />
      </div>
      <button onClick={testContent}>
        {isLoading ? "Loading Content" : "Get Content"}
      </button>
      <button onClick={testGrammer}>{"test grammer"}</button>
      <button onClick={summarizeContent}>
        {isLoading ? "Loading Content" : "Content Summary"}
      </button>
      {pcontent && <p>{pcontent}</p>}
    </div>
  );
}

export default TestComp;
