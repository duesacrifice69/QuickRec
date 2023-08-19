import Application from "../models/Application.js";
import BasicDetails from "../models/BasicDetails.js";
import { Op } from "sequelize";
import { application } from "express";
import { updateOrCreate } from "./Basic.dao.js";

const getExistingApplication = async (applicationId) => {
  try {
    const application = await Application.findOne({
      where: { ApplicationId: `${applicationId}` },
    });
    return application;
  } catch (e) {
    console.log(e);
  }
};

const createOrUpadateApplication = async (applicationReq) => {
  try {
    const application = await updateOrCreate(
      Application,
      {
        UserId: `${applicationReq?.UserId}`,
        VacancyId: `${applicationReq?.VacancyId}`,
      },
      applicationReq
    );
    return application.item;
  } catch (error) {
    console.log(error);
  }
};

const createBasicDetails = async (basicDetailsReq) => {
  try {
    const basicDetails = await updateOrCreate(
      BasicDetails,
      {
        UserId: `${basicDetailsReq?.userId}`,
      },
      basicDetailsReq
    );
    return basicDetails.item;
  } catch (error) {
    console.log(error);
  }
};

const getApplicationBasicDetails = async (req) => {
  const { userId } = req.query;
  try {
    const results = await req.app.locals.db.query(
      `SELECT title, nameWithInitials,nameDenotedbyInit,otherName,nic,dateOfBirth,
      sex,civilStatus,religion,addressLine1,addressLine2,nationality,ethnicity,mobileNo1,mobileNo2,email
      FROM ApplicationBasicDetails  
      WHERE userId = ${userId}`
    );

    return results.recordset[0];
  } catch (error) {
    console.log(error);
  }
};

export {
  createBasicDetails,
  createOrUpadateApplication,
  getExistingApplication,
  getApplicationBasicDetails,
};
