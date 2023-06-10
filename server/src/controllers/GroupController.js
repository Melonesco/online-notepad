import { GroupModel, SubjectModel, LabModel } from "../models/index.js";

export const getAllGroups = async (req, res) => {
  try {
    const posts = await GroupModel.find().populate("subjects").exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вийшло получити статі!!!",
    });
  }
};

export const getOneGroup = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await GroupModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" }
    )
      .populate("user")
      .exec();

    if (!doc) {
      return res.status(404).json({
        message: "Статтю не було знайдено",
      });
    }

    res.json(doc);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вийшло получити статтю!!!",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = GroupModel.findByIdAndDelete({
      _id: postId,
    }).exec();

    if (!doc) {
      return res.status(404).json({
        message: "Статтю не було знайдено",
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вийшло получити статтю!!!",
    });
  }
};

export const getAllSubjects = async (req, res) => {
  try {
    const posts = await GroupModel.find()
      .populate({
        path: "subjects",
        populate: { path: "countByLab" },
      })
      .exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вийшло получити статі!!!",
    });
  }
};

export const createGroup = async (req, res) => {
  try {
    const { nameGroup, subjects } = req.body;

    const savedSubjects = await Promise.all(
      subjects.map(async (item) => {
        const countByLab = await Promise.all(
          item.countByLab.map(async (lab) => {
            const labModel = new LabModel(lab);
            const savedLab = await labModel.save();
            return savedLab._id;
          })
        );

        const subject = new SubjectModel({
          nameSubject: item.nameSubject,
          countByLab: countByLab,
          RGR: item.RGR,
          CourseWork: item.CourseWork,
          Presentation: item.Presentation,
          Exam: item.Exam,
          ExamCredits: item.ExamCredits,
          CourseWorkCredits: item.CourseWorkCredits,
          score_subj: item.score_subj,
          max_score_subj: item.max_score_subj,
        });

        return await subject.save();
      })
    );

    const newGroup = new GroupModel({
      nameGroup,
      subjects: savedSubjects,
    });
    await newGroup.save();

    res.json(newGroup);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вийшло створити групу!",
    });
  }
};
