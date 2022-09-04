import Moment from "moment";
import { extendMoment } from "moment-range";

function checkForConflicts(bands, userSchedule) {
  const moment = extendMoment(Moment);
  if (!userSchedule) {
    return {};
  }

  const conflicts = {};
  const bandsByStage = bands.reduce((acc, band) => {
    if (!acc[band.stageId]) {
      acc[band.stageId] = [];
    }

    acc[band.stageId].push(band);

    return acc;
  }, {});

  const bandList = Object.values(bandsByStage);

  bandList.forEach((stage, i) => {
    stage.forEach((show) => {
      if (userSchedule[show.id] === true) {
        const otherStages = [...bandList];
        otherStages.splice(i, 1);
        otherStages.forEach((otherStage) => {
          const selectedRange = moment.range(...show.time);
          otherStage.forEach((otherShow) => {
            const targetRange = moment.range(...otherShow.time);
            if (selectedRange.overlaps(targetRange)) {
              conflicts[otherShow.id] = true;
            }
          });
        });
      }
    });
  });

  return conflicts;
}

export default checkForConflicts;
