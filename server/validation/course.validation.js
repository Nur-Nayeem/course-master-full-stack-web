import Joi from "joi";

const questionSchema = Joi.object({
  questionText: Joi.string().required(),
  options: Joi.array().items(Joi.string().required()).min(2).required(),
  correctAnswer: Joi.number().required(),
});

const quizSchema = Joi.object({
  questions: Joi.array().items(questionSchema).min(1).required(),
}).optional();

const lessonSchema = Joi.object({
  title: Joi.string().required(),
  videoUrl: Joi.string().uri().optional(),
  duration: Joi.string().optional(),
  quiz: quizSchema,
});

export const courseValidationSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  instructor: Joi.string().required(),
  price: Joi.number().min(0).optional(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).optional(),
  thumbnail: Joi.string().uri().optional(),
  lessons: Joi.array().items(lessonSchema).min(1).required(),
});
