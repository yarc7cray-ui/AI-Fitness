export interface Exercise {
  id: string
  name: string
  category: 'strength' | 'cardio' | 'flexibility' | 'sports'
  muscleGroups: MuscleGroup[]
  equipment: Equipment[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  description: string
  instructions: string[]
  tips: string[]
  images?: string[]
  videoUrl?: string
  calories_per_minute?: number
  // For strength exercises
  sets?: number
  reps?: string // "8-12" or "10" 
  restTime?: number // seconds
  // For cardio exercises
  duration?: number // minutes
  intensity?: 'low' | 'moderate' | 'high'
}

export type MuscleGroup = 
  | 'chest' | 'back' | 'shoulders' | 'arms' | 'biceps' | 'triceps'
  | 'legs' | 'quads' | 'hamstrings' | 'calves' | 'glutes'
  | 'core' | 'abs' | 'cardio' | 'full-body'

export type Equipment = 
  | 'none' | 'dumbbells' | 'barbell' | 'kettlebell' | 'resistance-bands'
  | 'pull-up-bar' | 'bench' | 'treadmill' | 'bike' | 'rowing-machine'
  | 'medicine-ball' | 'stability-ball' | 'cable-machine'

export interface WorkoutTemplate {
  id: string
  name: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number // minutes
  category: 'strength' | 'cardio' | 'hiit' | 'flexibility' | 'mixed'
  goal: 'muscle-gain' | 'weight-loss' | 'endurance' | 'strength' | 'maintenance'
  equipment: Equipment[]
  exercises: {
    exerciseId: string
    sets?: number
    reps?: string
    duration?: number
    restTime?: number
    notes?: string
  }[]
}

// Comprehensive Exercise Database
export const EXERCISES: Exercise[] = [
  // CHEST EXERCISES
  {
    id: 'push-ups',
    name: 'Push-ups',
    category: 'strength',
    muscleGroups: ['chest', 'arms', 'core'],
    equipment: ['none'],
    difficulty: 'beginner',
    description: 'Classic bodyweight exercise targeting chest, arms, and core muscles.',
    instructions: [
      'Start in a plank position with hands shoulder-width apart',
      'Keep your body in a straight line from head to heels',
      'Lower your chest until it nearly touches the ground',
      'Push back up to starting position',
      'Keep your core engaged throughout the movement'
    ],
    tips: [
      'Start with knee push-ups if regular push-ups are too difficult',
      'Focus on controlled movement rather than speed',
      'Keep your head in neutral position'
    ],
    sets: 3,
    reps: '8-15',
    restTime: 60
  },
  {
    id: 'dumbbell-bench-press',
    name: 'Dumbbell Bench Press',
    category: 'strength',
    muscleGroups: ['chest', 'shoulders', 'triceps'],
    equipment: ['dumbbells', 'bench'],
    difficulty: 'intermediate',
    description: 'Effective chest exercise using dumbbells for better range of motion.',
    instructions: [
      'Lie on a bench with dumbbells in each hand',
      'Start with arms extended above chest',
      'Lower the dumbbells to chest level with control',
      'Press back up to starting position',
      'Keep your feet flat on the ground'
    ],
    tips: [
      'Use a spotter when lifting heavy weights',
      'Keep your shoulders back and down',
      'Control the weight throughout the entire range of motion'
    ],
    sets: 4,
    reps: '8-12',
    restTime: 90
  },

  // BACK EXERCISES  
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    category: 'strength',
    muscleGroups: ['back', 'biceps', 'shoulders'],
    equipment: ['pull-up-bar'],
    difficulty: 'intermediate',
    description: 'Challenging upper body exercise that builds back and arm strength.',
    instructions: [
      'Hang from a pull-up bar with palms facing away',
      'Start with arms fully extended',
      'Pull yourself up until chin clears the bar',
      'Lower yourself back down with control',
      'Keep your core engaged throughout'
    ],
    tips: [
      'Use resistance bands for assistance if needed',
      'Focus on pulling with your back muscles',
      'Avoid swinging or using momentum'
    ],
    sets: 3,
    reps: '5-10',
    restTime: 90
  },
  {
    id: 'dumbbell-rows',
    name: 'Dumbbell Rows',
    category: 'strength',
    muscleGroups: ['back', 'biceps', 'shoulders'],
    equipment: ['dumbbells', 'bench'],
    difficulty: 'beginner',
    description: 'Single-arm rowing exercise that targets the back muscles.',
    instructions: [
      'Place one knee and hand on a bench',
      'Hold dumbbell in opposite hand with arm extended',
      'Row the weight up to your hip',
      'Squeeze your shoulder blade at the top',
      'Lower with control and repeat'
    ],
    tips: [
      'Keep your back straight throughout the movement',
      'Pull with your back, not your arm',
      'Control the weight on the way down'
    ],
    sets: 3,
    reps: '10-12',
    restTime: 60
  },

  // LEG EXERCISES
  {
    id: 'squats',
    name: 'Bodyweight Squats',
    category: 'strength',
    muscleGroups: ['legs', 'quads', 'glutes', 'core'],
    equipment: ['none'],
    difficulty: 'beginner',
    description: 'Fundamental lower body exercise targeting multiple muscle groups.',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body as if sitting back into a chair',
      'Keep your chest up and knees tracking over toes',
      'Lower until thighs are parallel to ground',
      'Push through heels to return to standing'
    ],
    tips: [
      'Keep your weight on your heels',
      'Don\'t let knees cave inward',
      'Start with partial squats if full depth is difficult'
    ],
    sets: 3,
    reps: '12-20',
    restTime: 60
  },
  {
    id: 'lunges',
    name: 'Forward Lunges',
    category: 'strength',
    muscleGroups: ['legs', 'quads', 'glutes', 'core'],
    equipment: ['none'],
    difficulty: 'beginner',
    description: 'Single-leg exercise that improves balance and leg strength.',
    instructions: [
      'Stand with feet hip-width apart',
      'Step forward with one leg into a lunge position',
      'Lower until both knees are at 90 degrees',
      'Push off front foot to return to starting position',
      'Alternate legs or complete all reps on one side'
    ],
    tips: [
      'Keep your torso upright',
      'Don\'t let your front knee go past your toes',
      'Control the movement in both directions'
    ],
    sets: 3,
    reps: '10-12 each leg',
    restTime: 60
  },

  // CARDIO EXERCISES
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    category: 'cardio',
    muscleGroups: ['cardio', 'full-body'],
    equipment: ['none'],
    difficulty: 'beginner',
    description: 'High-energy cardio exercise that gets your heart rate up quickly.',
    instructions: [
      'Start standing with feet together and arms at sides',
      'Jump feet apart while raising arms overhead',
      'Jump feet back together while lowering arms',
      'Maintain a steady rhythm',
      'Land softly on the balls of your feet'
    ],
    tips: [
      'Keep your core engaged',
      'Land softly to protect your joints',
      'Modify by stepping side to side if jumping is too intense'
    ],
    duration: 1,
    calories_per_minute: 10,
    intensity: 'moderate'
  },
  {
    id: 'burpees',
    name: 'Burpees',
    category: 'cardio',
    muscleGroups: ['full-body', 'cardio', 'core'],
    equipment: ['none'],
    difficulty: 'advanced',
    description: 'High-intensity full-body exercise combining squat, plank, and jump.',
    instructions: [
      'Start in standing position',
      'Drop into a squat and place hands on ground',
      'Jump feet back into plank position',
      'Do a push-up (optional)',
      'Jump feet back to squat position',
      'Explode up into a jump with arms overhead'
    ],
    tips: [
      'Move at your own pace',
      'Modify by stepping instead of jumping',
      'Focus on form over speed'
    ],
    sets: 3,
    reps: '5-10',
    restTime: 90,
    calories_per_minute: 15,
    intensity: 'high'
  },

  // CORE EXERCISES
  {
    id: 'plank',
    name: 'Plank',
    category: 'strength',
    muscleGroups: ['core', 'abs', 'shoulders'],
    equipment: ['none'],
    difficulty: 'beginner',
    description: 'Isometric exercise that builds core strength and stability.',
    instructions: [
      'Start in push-up position with forearms on ground',
      'Keep body in straight line from head to heels',
      'Engage your core and hold the position',
      'Breathe normally throughout',
      'Keep hips level, don\'t let them sag or rise'
    ],
    tips: [
      'Start with shorter holds and build up time',
      'Focus on quality over duration',
      'Keep your neck in neutral position'
    ],
    duration: 1, // 1 minute hold
    sets: 3,
    restTime: 60
  },
  {
    id: 'crunches',
    name: 'Crunches',
    category: 'strength',
    muscleGroups: ['abs', 'core'],
    equipment: ['none'],
    difficulty: 'beginner',
    description: 'Classic abdominal exercise targeting the rectus abdominis.',
    instructions: [
      'Lie on your back with knees bent and feet flat',
      'Place hands behind head or across chest',
      'Lift shoulders off ground by contracting abs',
      'Hold briefly at the top',
      'Lower back down with control'
    ],
    tips: [
      'Don\'t pull on your neck',
      'Focus on lifting with your abs, not momentum',
      'Keep your lower back pressed to the floor'
    ],
    sets: 3,
    reps: '15-25',
    restTime: 45
  },

  // ARM EXERCISES
  {
    id: 'tricep-dips',
    name: 'Tricep Dips',
    category: 'strength',
    muscleGroups: ['triceps', 'shoulders', 'chest'],
    equipment: ['bench'],
    difficulty: 'intermediate',
    description: 'Bodyweight exercise targeting the triceps using a bench or chair.',
    instructions: [
      'Sit on edge of bench with hands gripping the edge',
      'Slide your body off the bench, supporting weight with arms',
      'Lower your body by bending elbows',
      'Lower until elbows are at 90 degrees',
      'Push back up to starting position'
    ],
    tips: [
      'Keep elbows close to your body',
      'Don\'t lower too far to avoid shoulder strain',
      'Bend knees to make easier, extend legs to make harder'
    ],
    sets: 3,
    reps: '8-12',
    restTime: 60
  }
]

// Workout Templates
export const WORKOUT_TEMPLATES: WorkoutTemplate[] = [
  {
    id: 'beginner-full-body',
    name: 'Beginner Full Body',
    description: 'A complete workout for beginners targeting all major muscle groups',
    difficulty: 'beginner',
    duration: 30,
    category: 'strength',
    goal: 'muscle-gain',
    equipment: ['none'],
    exercises: [
      { exerciseId: 'squats', sets: 3, reps: '12-15', restTime: 60 },
      { exerciseId: 'push-ups', sets: 3, reps: '8-12', restTime: 60 },
      { exerciseId: 'lunges', sets: 3, reps: '10 each leg', restTime: 60 },
      { exerciseId: 'plank', duration: 30, sets: 3, restTime: 60 },
      { exerciseId: 'crunches', sets: 3, reps: '15-20', restTime: 45 }
    ]
  },
  {
    id: 'upper-body-strength',
    name: 'Upper Body Strength',
    description: 'Focus on building upper body strength with dumbbells',
    difficulty: 'intermediate',
    duration: 45,
    category: 'strength',
    goal: 'strength',
    equipment: ['dumbbells', 'bench', 'pull-up-bar'],
    exercises: [
      { exerciseId: 'dumbbell-bench-press', sets: 4, reps: '8-10', restTime: 90 },
      { exerciseId: 'pull-ups', sets: 3, reps: '5-8', restTime: 90 },
      { exerciseId: 'dumbbell-rows', sets: 3, reps: '10-12', restTime: 60 },
      { exerciseId: 'tricep-dips', sets: 3, reps: '8-12', restTime: 60 },
      { exerciseId: 'push-ups', sets: 2, reps: 'to failure', restTime: 60 }
    ]
  },
  {
    id: 'cardio-hiit',
    name: 'HIIT Cardio Blast',
    description: 'High-intensity interval training for maximum calorie burn',
    difficulty: 'intermediate',
    duration: 20,
    category: 'hiit',
    goal: 'weight-loss',
    equipment: ['none'],
    exercises: [
      { exerciseId: 'jumping-jacks', duration: 1, restTime: 30 },
      { exerciseId: 'burpees', sets: 1, reps: '8-10', restTime: 30 },
      { exerciseId: 'squats', sets: 1, reps: '20', restTime: 30 },
      { exerciseId: 'push-ups', sets: 1, reps: '10-15', restTime: 30 },
      { exerciseId: 'plank', duration: 45, restTime: 30 },
      // Repeat 3-4 rounds
    ]
  },
  {
    id: 'lower-body-power',
    name: 'Lower Body Power',
    description: 'Build strength and power in your legs and glutes',
    difficulty: 'intermediate',
    duration: 40,
    category: 'strength',
    goal: 'strength',
    equipment: ['none'],
    exercises: [
      { exerciseId: 'squats', sets: 4, reps: '15-20', restTime: 90 },
      { exerciseId: 'lunges', sets: 3, reps: '12 each leg', restTime: 60 },
      { exerciseId: 'jumping-jacks', duration: 2, restTime: 60 },
      { exerciseId: 'squats', sets: 3, reps: '12', restTime: 60, notes: 'Jump squats' },
      { exerciseId: 'plank', duration: 60, sets: 2, restTime: 60 }
    ]
  }
]

// Helper functions
export class ExerciseDatabase {
  static getExerciseById(id: string): Exercise | undefined {
    return EXERCISES.find(exercise => exercise.id === id)
  }

  static getExercisesByCategory(category: Exercise['category']): Exercise[] {
    return EXERCISES.filter(exercise => exercise.category === category)
  }

  static getExercisesByMuscleGroup(muscleGroup: MuscleGroup): Exercise[] {
    return EXERCISES.filter(exercise => 
      exercise.muscleGroups.includes(muscleGroup)
    )
  }

  static getExercisesByEquipment(equipment: Equipment[]): Exercise[] {
    return EXERCISES.filter(exercise => 
      exercise.equipment.every(eq => equipment.includes(eq))
    )
  }

  static getExercisesByDifficulty(difficulty: Exercise['difficulty']): Exercise[] {
    return EXERCISES.filter(exercise => exercise.difficulty === difficulty)
  }

  static searchExercises(query: string): Exercise[] {
    const lowercaseQuery = query.toLowerCase()
    return EXERCISES.filter(exercise =>
      exercise.name.toLowerCase().includes(lowercaseQuery) ||
      exercise.description.toLowerCase().includes(lowercaseQuery) ||
      exercise.muscleGroups.some(mg => mg.toLowerCase().includes(lowercaseQuery))
    )
  }

  static getWorkoutTemplateById(id: string): WorkoutTemplate | undefined {
    return WORKOUT_TEMPLATES.find(template => template.id === id)
  }

  static getWorkoutTemplatesByGoal(goal: WorkoutTemplate['goal']): WorkoutTemplate[] {
    return WORKOUT_TEMPLATES.filter(template => template.goal === goal)
  }

  static getWorkoutTemplatesByDifficulty(difficulty: WorkoutTemplate['difficulty']): WorkoutTemplate[] {
    return WORKOUT_TEMPLATES.filter(template => template.difficulty === difficulty)
  }

  static getWorkoutTemplatesByEquipment(equipment: Equipment[]): WorkoutTemplate[] {
    return WORKOUT_TEMPLATES.filter(template => 
      template.equipment.every(eq => equipment.includes(eq))
    )
  }
}
