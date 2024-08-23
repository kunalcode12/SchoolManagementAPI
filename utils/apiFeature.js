const degreeToRadian = (deg) => deg * (Math.PI / 180);

// Haversine formula
const calculateDistance = function (lat1, lng1, lat2, lng2) {
  const Radius = 6371;
  const differenceLat = degreeToRadian(lat2 - lat1);
  const differenceLng = degreeToRadian(lng2 - lng1);
  const halfCordLength =
    Math.sin(differenceLat / 2) * Math.sin(differenceLat / 2) +
    Math.cos(degreeToRadian(lat1)) *
      Math.cos(degreeToRadian(lat2)) *
      Math.sin(differenceLng / 2) *
      Math.sin(differenceLng / 2);
  const centralAngle =
    2 * Math.atan2(Math.sqrt(halfCordLength), Math.sqrt(1 - halfCordLength));
  const distance = Radius * centralAngle;
  return distance;
};

module.exports = calculateDistance;
