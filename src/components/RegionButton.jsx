
import React from 'react';

export default () => {
const regions = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos"]

regions.map(region => <button onClick={() => setRegion(region)}>{region}</button>)
}