import "../../assets/styles/header.css";
import { IconButton, Badge } from "@mui/material/";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginDialog from "./LoginDialog";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen]=useState(false);
  const [cartArray, setCartArray]=useState([])
//This can be removed later, right now it allows for badge functionality
  const addOneToArray = () => {
    setCartArray([...cartArray, 1])
    console.log(cartArray);
  };

  return (
    <header>
      <div className="title" >
        <img id="emerald"src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/391aa854-ba50-427b-a8ab-68392d1af18f/dc8se70-80ef917b-a4ab-4d15-a04c-15341266400f.png/v1/fill/w_330,h_345/16bit___green_crystal_by_pixelgedon_dc8se70-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MzQ1IiwicGF0aCI6IlwvZlwvMzkxYWE4NTQtYmE1MC00MjdiLWE4YWItNjgzOTJkMWFmMThmXC9kYzhzZTcwLTgwZWY5MTdiLWE0YWItNGQxNS1hMDRjLTE1MzQxMjY2NDAwZi5wbmciLCJ3aWR0aCI6Ijw9MzMwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.rnCxcyrOscdgB4f9GDzn6CF0R7RrZ8S0IuI4mzqtNBk" alt="logo" onClick={() => navigate("/", {replace: true})}/>
        <p id="vibes">Crystalline Vibes</p>
      </div>
      <div className="rightSideUtils" >
        <IconButton onClick={() => navigate("/Admin", {replace: true})}>
          <SettingsIcon />
        </IconButton>
        <IconButton color="primary" onClick={addOneToArray}>
          <Badge badgeContent={cartArray.length} color="tertiary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="fingerprint" color="primary" onClick={() => setOpen(true)}>
          <FingerprintIcon />
        </IconButton>
        <LoginDialog open={open} setOpen={setOpen} />
      </div>
    </header>
  )
}

export default Header;