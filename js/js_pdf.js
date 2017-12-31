//4.3 EXPORT TABLE
var PDFvalue = $('#PDFheading').text();
console.log(PDFvalue);

var geologo = 'logo.jpg';


var tableToPDF = function(){
  console.log("PDF starts");
  // SETTUING THE THE PDF PARAMETERS
  // https://stackoverflow.com/questions/24335372/setting-pdf-page-width-height-when-using-jspdf
  var doc = new jsPDF("1", "", "letter");
  var pageHeight = doc.internal.pageSize.height;
  var pageWidth = doc.internal.pageSize.width;
  console.log(pageHeight);
  console.log(pageWidth);

  doc.setFontSize(10);
  doc.setFontType("light");
  doc.setFont("inherit");
  doc.text(10, 5, 'DataXLat @ Geoadaptive LLC.');
  doc.text(150,5, '250 Summer St, Boston, MA, USA');
  //DIVIDING LINE
  doc.setLineWidth(1);
  doc.setDrawColor(255,140,40);
  doc.line(0, 8, 240, 8);

  doc.setFont("times");
  doc.setFontSize(18);
  doc.setFontType("bold");
  doc.text(10, 18, 'Urban Heat Island Effect of');
  doc.setTextColor(255,140,40);

  //INTRO
  doc.setFont("times");
  doc.setFontType("normal");
  doc.setFontSize(12);
  doc.setTextColor(0,0,0);
  doc.text(10, 30, 'Following is a brief summary of infrastructure efficiency condition in ');

  //TRIAL 2 STACKED BAR CHART

  //SOCIAL ECONOMIC INFO
  var splitTitle = doc.splitTextToSize("      Guatemala, a Central American country south of Mexico, is home to volcanoes, rainforests and ancient Mayan sites. The capital, Guatemala City, features the stately National Palace of Culture and the National Museum of Archaeology and Ethnology. Antigua, west of the capital, contains preserved Spanish colonial buildings. Lake Atitlán, formed in a massive volcanic crater, is surrounded by coffee fields and villages. Guatemala City is the capital of Guatemala, in Central America. It’s known for its Mayan history, high-altitude location and nearby volcanoes. On central Plaza Mayor, also known as Parque Central, the Metropolitan Cathedral is full of colonial paintings and religious carvings. The National Palace of Culture has a balcony overlooking the square. South of the city, trails lead up to the active Pacaya Volcano.", 90);
  doc.text(10, 130, splitTitle);



  //PAGE NUMBER
  doc.setFont("arial");
  doc.setFontType("normal");
  doc.setFontSize(8);
  doc.text(95, 275, 'Page 1 of 3');


  //PAGE NUMBER
  doc.setFont("arial");
  doc.setFontType("normal");
  doc.setFontSize(8);
  doc.text(95, 275, 'Page 2 of 3');



  //THE THIRD PAGE FOR TABLE ONLY
  doc.addPage();
  doc.setPage(3);


  doc.setFontSize(10);
  doc.setFontType("light");
  doc.setFont("inherit");
  doc.text(10, 5, 'DataXLat @ Geoadaptive LLC.');
  doc.text(150, 5, '250 Summer St, Boston, MA, USA');
  //DIVIDING LINE
  doc.setLineWidth(1);
  doc.setDrawColor(255,140,40);
  doc.line(0, 8, 240, 8);


  //EDUCATION
  doc.setFont("georgia");
  doc.setFontType("bold");
  doc.setFontSize(12);
  doc.text(10, 18, '1) EDUCATION');
  doc.setFont("times");
  doc.setFontType("normal");
  doc.text(10, 26, 'Literacy Rate: ' + '75%');
  doc.text(10, 32, 'Number of Primary Schools: ' + '311');
  doc.text(10, 38, 'Number of Middle Schools: ' + '69');
  doc.text(10, 44, 'Number of High Schools: ' + '18');
  doc.text(10, 50, 'Total Enrollment Number: ' + '12067');

  //PUBLIC HEALTH
  doc.setFont("georgia");
  doc.setFontType("bold");
  // doc.setFontSize(12);
  doc.text(10, 62, '2) PUBLIC HEALTH');
  doc.setFont("times");
  doc.setFontType("normal");
  doc.text(10, 70, 'Number of Hospitals: ' + '3');
  doc.text(10, 76, 'Number of Clinics: ' + '42');
  doc.text(10, 82, 'Maximum Capacity for Medical Treatment: ' + '30021');

  //UTILITY
  doc.setFont("georgia");
  doc.setFontType("bold");
  doc.text(10, 94, '3) UTILITIES');
  doc.setFont("times");
  doc.setFontType("normal");
  doc.text(10, 102, 'Sanitation (% of coverage): ' + '1000 km');
  doc.text(10, 108, 'Electricity (% of coverage): ' + '1000 km');
  doc.text(10, 114, 'Water (% of coverage): ' + '1000 km');
  doc.text(10, 120, 'Basic Needs Unsatisfied (% of coverage): ' + '50%');

  //OTHER NOTES
  doc.setFont("georgia");
  doc.text(10, 250, 'Notes: ' + 'things to keep in mind');

  //OTHER NOTES
  doc.setFont("times");
  doc.setFontType("italic");
  doc.setFontSize(10);
  doc.text(10, 260, '* This data was obtained from ');
  // doc.text(10, 265, '' + P_source);


  //PAGE NUMBER
  doc.setFont("arial");
  doc.setFontType("normal");
  doc.setFontSize(8);
  doc.text(95, 275, 'Page 2 of 3');


  doc.save('Adaptation Report.pdf');
  console.log("PDF ready");
};
