import { UserModel, UserSubjectLabModel } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      nameGroup: req.body.nameGroup,
      subjects: req.body.subjects,
      passwordHash: hash,
      group: req.body.group._id,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "120d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не получилося зареєструватися користувача",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).populate(
      "group"
    );

    if (!user) {
      return res.status(404).json({
        message: "Користувача не найдено",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(404).json({
        message: "Неправильний логін або пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "120d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не получилося зареєструватися користувача",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Користувача не знайдено",
      });
    }
    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Немає доступу",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find()
      .populate({
        path: "group",
        populate: {
          path: "subjects",
          populate: {
            path: "countByLab",
          },
        },
      })
      .exec();

    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вийшло получити статі!!!",
    });
  }
};

export const getUserLabs = async (req, res) => {
  const userId = req.userId;

  try {
    const doc = await UserSubjectLabModel.find(userId).populate("lab").exec();

    res.json(doc);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вийшло получити статі!!!",
    });
  }
};

export const getGroupWithSubjectsAndLabs = async (req, res) => {
  const userId = req.userId;
  try {
    const userLabs = await UserSubjectLabModel.find({ user: userId })
      .populate("lab")
      .populate("subject")
      .exec();

    res.json(userLabs);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вийшло получити доступ до лаб!!!",
    });
  }
};

export const updateSubjectLabMark = async (req, res) => {
  try {
    const { userId, subjectId, labId, bonusProjectId, labMark, passed } =
      req.body;

    const userLab = await UserSubjectLabModel.findOneAndUpdate(
      {
        user: userId,
        lab: labId,
        passed: passed,
        bonusProject: bonusProjectId,
        subject: subjectId,
      },
      { labMark },
      { new: true, upsert: true }
    );

    if (!userLab) {
      return res.status(404).json({ message: "Лабораторну не знайдено" });
    }

    return res.json({ lab: userLab });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Щось пішло не так" });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await UserModel.findByIdAndRemove(userId);

    res.json({ message: "Користувача успішно видалено" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Помилка при видаленні користувача" });
  }
};
