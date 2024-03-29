import { css } from "@emotion/css";
import rough from '../assets/rough.png';

export const stages = [
  { name: "Monster Energy Stage", location: "Pond" },
  { name: "Plug Your Holes Stage", location: "Shed" },
  { name: "Baked Brothers Stage", location: "Main" },
];

export const roughStyle = css`
  background-blend-mode: difference;
  background-color: black;
  background-image: url(${rough});
  background-size: contain;
`;