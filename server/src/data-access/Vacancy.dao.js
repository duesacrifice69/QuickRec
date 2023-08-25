import Vacancy from "../models/Vacancy.js";
import { updateOrCreate } from "./Basic.dao.js";

const createOrUpadateVacancy = async (vacancyReq, req) => {
  try {
    const vacancy = await updateOrCreate(
      Vacancy,
      {
        VacancyId: vacancyReq.VacancyId ? vacancyReq.VacancyId : null,
      },
      vacancyReq
    );
    return vacancy.item;
  } catch (error) {
    console.log(error);
  }
};

const getVacanciesBySearch = async (req) => {
  const { searchQuery } = req.query;
  try {
    const results = await req.app.locals.db.query(
      `SELECT AdvertismentPath,AgeLimit,ClosingDate,NoOfVacancies,
      PlannedInterViewDate,PublishedDate,RecruitmentType,Remarks,SalaryGroup,Vacancies.Status,Vacancies.VacancyId,BoardGrade,ApplicationId AS NoOfApplicants,Vacancies.BoardGradeId,Vacancies.SalaryGroupId,
      VacancyName,Vacancies.updatedAt, 
      IIF(DATEDIFF(day,Vacancies.updatedAt,GETUTCDATE()) = 0,CONCAT(DATEDIFF(hh,Vacancies.updatedAt,GETUTCDATE()), ' hours ago'),
      CONCAT(DATEDIFF(day,Vacancies.updatedAt,GETUTCDATE()), ' days ago')) DaysPosted
      FROM Vacancies
      INNER JOIN Applications app ON app.VacancyId = Vacancies.VacancyId
      INNER JOIN BoardGrades bg ON bg.BoardGradeId = Vacancies.BoardGradeId
      INNER JOIN SalaryGroups sg ON sg.SalaryGroupId = Vacancies.SalaryGroupId WHERE lower(VacancyName) like '%${searchQuery}%'
      ORDER BY updatedAt DESC`
    );

    return results.recordset;
  } catch (error) {
    console.error(error);
    return { message: "Failed data retrieval", error };
  }
};

export { createOrUpadateVacancy, getVacanciesBySearch };
