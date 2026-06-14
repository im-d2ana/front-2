export type tTasks = {
    "question": string;
    "answer": string;
}[]

export type tSortTask = {
    "items": string[];
}

export type tChoiceTask = {
    "question": string;
    "options": string[];
    "correct": string[];
}[]

export type tQuizItem =
    | {
        "id": number;
        "type": "M";
        "title": string;
        "tasks": tTasks;
      }
    | {
        "id": number;
        "type": "S";
        "title": string;
        "tasks": tSortTask;
      }
    | {
        "id": number;
        "type": "C";
        "title": string;
        "tasks": tChoiceTask;
      }
    | {
        "id": number;
        "type": "MC";
        "title": string;
        "tasks": tChoiceTask;
      };

export type tQuizzes = tQuizItem[];

export const quiz: tQuizzes = [
  {
    "id": 1,
    "type": "M",
    "title": "Сопоставьте самолёт и его тип.",
    "tasks": [
      { 
        "question": "Ан-124 «Руслан»",
        "answer": "Транспортный" 
      },
      { 
        "question": "Airbus A320",
        "answer": "Пассажирский узкофюзеляжный"
      },
      { 
        "question": "Gulfstream G650",
        "answer": "Бизнес-джет" 
      },
      { 
        "question": "Сухой Су-57",
        "answer": "Истребитель 5-го поколения" 
      },
    ]
  },
  {
    "id": 2,
    "type": "M",
    "title": "Сопоставьте самолёт и его максимальную скорость.",
    "tasks": [
      { 
        "question": "Ан-124 «Руслан»",  
        "answer": "865" 
      },
      { 
        "question": "Airbus A320",       
        "answer": "840" 
      },
      { 
        "question": "Gulfstream G650",   
        "answer": "956" 
      },
      { 
        "question": "Сухой Су-57",       
        "answer": "2600" 
      },
    ]
  },
  {
    "id": 3,
    "type": "S",
    "title": "Расставьте самолёты в порядке возрастания максимальной скорости.",
    "tasks": {
      "items": ["Airbus A320", "Ан-124 «Руслан»", "Gulfstream G650", "Сухой Су-57"]
    }
  },
  {
    "id": 4,
    "type": "S",
    "title": "Расставьте самолёты в порядке возрастания максимальной дальности полёта.",
    "tasks": {
      "items": ["Сухой Су-57", "Airbus A320", "Gulfstream G650", "Ан-124 «Руслан»"]
    }
  },
  {
    "id": 5,
    "type": "C",
    "title": "Выберите один правильный ответ.",
    "tasks": [
      {
        "question": "К какому классу относится Gulfstream G650?",
        "options": ["Транспортный", "Истребитель", "Бизнес-джет", "Пассажирский узкофюзеляжный"],
        "correct": ["Бизнес-джет"]
      }
    ]
  },
  {
    "id": 6,
    "type": "MC",
    "title": "Выберите все правильные ответы.",
    "tasks": [
      {
        "question": "Какие самолёты являются гражданскими?",
        "options": ["Ан-124 «Руслан»", "Airbus A320", "Сухой Су-57", "Gulfstream G650"],
        "correct": ["Ан-124 «Руслан»", "Airbus A320", "Gulfstream G650"]
      },
      {
        "question": "Какие самолёты производятся в России?",
        "options": ["Airbus A320", "Сухой Су-57", "Ан-124 «Руслан»", "Gulfstream G650"],
        "correct": ["Сухой Су-57", "Ан-124 «Руслан»"]
      }
    ]
  }
];
