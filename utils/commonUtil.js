const getStartIndex = (page) => {
  const pageSize = 20;
  const pageStartIndex = pageSize * (page - 1) + 1;
  return pageStartIndex;
};
const getDomainName = (url) => {
  return url && new URL(url).hostname;
};

const getDifferenceInHrs = (date) => {
  const dt1 = new Date(date);
  const dt2 = new Date();
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
};

export { getStartIndex, getDomainName, getDifferenceInHrs };
