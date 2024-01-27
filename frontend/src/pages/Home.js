import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material/';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../assets/styles/home.css';

const Home = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const navigate = useNavigate();

  return (
    <div className="homeBox">
      <Accordion classes={{root:"rootStyle"}} expanded={expanded === "Healer"} onChange={handleChange("Healer")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Healing Crystals
        </AccordionSummary>
        <AccordionDetails>
          <div className="accordDeets">
            <img src="https://www.badawangart.com/wp-content/uploads/2020/05/IMG_0583-1.jpeg" alt="Healing Crystal" />
            <p>
              The belief is that this type of crystal interacts with the body's energy field, creating balance and alignment. Many people use these crystals for stress and focus, while others believe that these crystals have the power to heal physical ailments and illnesses.
            </p>
          </div>
          <div className="Button">
            <Button variant="contained" onClick={() => navigate("/Healing", {replace: true})}>Shop Healing Crystals</Button>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion classes={{root:"rootStyle"}} expanded={expanded === "Future"} onChange={handleChange("Future")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Divination Crystals
        </AccordionSummary>
        <AccordionDetails>
          <div className="accordDeets">
            <img src="https://m.media-amazon.com/images/I/41t+BqVRwZL._AC_SY300_SX300_.jpg" alt="Crystal Ball" />
            <p>
              Crystals are used a couple differenct ways for Divination. The first being Scrying, or Crystal Gazing. This involves seeing things, supernaturally, in a medium. The second use is Lithomancy, or the casting of stones. This can be done in a way to produce simple yes/no answers, stones meaning specific things such as zodiac influences, or cast onto a layout to provide interpretation of spread and groupings.
            </p>
          </div>
          <div className="Button">
            <Button variant="contained" onClick={() => navigate("/Divination", {replace: true})}>Shop Divining Crystals</Button>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion classes={{root:"rootStyle"}} expanded={expanded === "Money"} onChange={handleChange("Money")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Manifestation Crystals
        </AccordionSummary>
        <AccordionDetails>
          <div className="accordDeets">
            <img src="https://cdn.britannica.com/52/100752-050-784C6A3D/Pyrite.jpg" alt="Preperation to manifest riches" />
            <p>
              The use of crystals for manifestation is based on the belief that they can help amplify our thoughts, intentions, and emotions, thus enhancing our ability to attract what we desire into our lives.
            </p>
          </div>
          <div className="Button">
            <Button variant="contained" onClick={() => navigate("/Manifest", {replace: true})}>Shop Manifestation Crystals</Button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
};

export default Home;