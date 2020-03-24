const fs  = require('fs')
const parse = require('csv-parse')
const assert = require('assert')
const _ = require('lodash');
const output = []
const FILE_PATH = 'file.csv';
const TAB_DELIMITER = '\t';
const COMMA_DELIMITER = ',';

const parser = parse({
        trim: true,
        quote: '',
        skip_empty_lines: true,
        delimiter: COMMA_DELIMITER
},  (err, records) => {


  const saveFileContentToArray = records => {
    const bucket = [];
    records.forEach((line, index) => {
      if(index !== 0) {
        const row = {
          UserId: line[0],
          FirstName: line[1],
          LastName: line[2],
          Version: line[3],
          InsuranceCompany: line[4]
        }
        bucket.push(row)
      }
    });
    return bucket;
  }

  const fileContent  = saveFileContentToArray(records);
  const sortedFileContent = _.sortBy(fileContent, ['LastName', 'FirstName', 'Version']);

  const organizeByInsurance = arr => {
    const organizedByInsuranceCompanies = {};
    arr.forEach(record => {
      if(!organizedByInsuranceCompanies[record.InsuranceCompany]) {
        organizedByInsuranceCompanies[record.InsuranceCompany] = [record];
      } else {
        // checkIfUserRecordExists(organizedByInsuranceCompanies[record.InsuranceCompany], records);
        organizedByInsuranceCompanies[record.InsuranceCompany].push(record);
      }
    })
    return organizedByInsuranceCompanies;
  }

  const organizedByInsurance = organizeByInsurance(sortedFileContent);
  const insuranceCompanies = Object.keys(organizedByInsurance);
  const cleanedUp = {};

  insuranceCompanies.forEach(company=> {
    cleanedUp[company] = [];
  })

  insuranceCompanies.forEach(companyName => {
    organizedByInsurance[companyName].forEach(currentRecord => {
      if(!cleanedUp[companyName].length) {
        cleanedUp[companyName].push(currentRecord)
      } else {     
          const lastIndex = cleanedUp[companyName].length - 1;
          const lastRecord = cleanedUp[companyName][lastIndex];
        if(lastRecord.UserId === currentRecord.UserId) {
          lastRecord.Version = currentRecord.Version;
        } else {
          cleanedUp[companyName].push(currentRecord)
        }
      }
    })
  })


  insuranceCompanies.forEach(company => {
    writeStream = fs.createWriteStream(`./${company}.csv`);
    const dataForCompanies = [ 'UserId', 'FirstName', 'LastName', 'Version', 'InsuranceCompany' ];
    const readyToWrite = {
      
    }
    readyToWrite[company] = dataForCompanies;

    cleanedUp[company].forEach(record => {
      const values = Object.values(record);
      values.forEach(value => readyToWrite[company].push(value));
    })
    
    let tracker = 0;
    let delimiter = '';
    readyToWrite[company].forEach(record => {
          tracker++;
          if(tracker < 5) {
            delimiter = ','
          } else {
            delimiter = '\n'
            tracker = 0;
          }
          writeStream.write(record+delimiter, (err) => {
            
            if (err) {
              console.log(err.message)
            } else {
              console.log('')
            }
        })
    })
  })
  })

fs.createReadStream(FILE_PATH)
  // .on('error', (e) => {console.log('ERRor', e)})
  .pipe(parser)
