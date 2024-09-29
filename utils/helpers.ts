export const formatPhoneNumber = (phoneNumber: any) => {
  if (phoneNumber) {
    if (phoneNumber.length === 9) {
      return phoneNumber.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4");
    } else {
      return phoneNumber.replace(
        /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
        "$1 $2 $3 $4 $5"
      );
    }
  }
};

export const removeHTMLTags = (s: any) => {
  const pattern = new RegExp("\\<.*?\\>");
  const pattern2 = new RegExp("\\<.*?\\>");

  // Use regex_replace function in regex
  // to erase every tags enclosed in <>
  s = new String(s).replace(pattern, "");
  s = s.replace(pattern2, "");

  return s;
};

export const reGroup = (list: Array<any>, key: any) => {
  const groups: any = [];
  list.forEach((item) => {
    let groupIndex = groups.findIndex((gi: any) => gi.key === item[key]);
    if (groupIndex === -1) {
      // when the group containing object does not exist in the array,
      // create it
      groups.push({ key: item[key], items: [] });
      groupIndex = groups.length - 1;
    }
    const newItem = Object.assign({}, item);
    groups[groupIndex].items.push(newItem);
  });
  return groups;
};
