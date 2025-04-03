// Copyright 2025 Adithya Lakshminarayanan, Nicolas Kleban
// All rights reserved
const values = [
    [0, 15, 30, 45, -1, -1, -1, -1],
    [0, 15, 30, 30, 45, 45, 65, 90],
    [0, 15, 45, 65, 65, 90, 90, 90],
    [15, 45, 65, 90, 120, 120, 120, 120]
]

// Glucose/Fructose Ratios
const MOST_RATIOS_OKAY = "Any glucose/fructose ratio is suitable";
const MOST_GLUCOSE_SOME_FRUCTOSE = "Mostly glucose, some fructose";
const GLUCOSE_FRUCTOSE_TWO_ONE = "Glucose/fructose ratio 2:1";

// Sources of Carbohydrates
const RECOVERY_ENDURANCE_MODERATE = "Solids/gels/liquids/soft chews are all appropriate";
const HARD_WORKOUT_UNDER_3HR = "Gels/liquids/soft chews are appropriate";
const HARD_WORKOUT_OVER_3HR = "Consume solids at the start of activity, followed by gels/liquids/soft chews";

// Gut training
const UNDER_60 = "Unlikely risk of GI distress; no gut training required";
const BETWEEN_60_90 = "Moderate risk of GI distress; consider gut training";
const OVER_90 = "High risk of GI distress; gut training is essential";


// Carbs per bar
const CARBS_PER_BAR = 25;

function calculateCarbsNeeded(intensity, duration) {
    return values[intensity][duration];
}

function glucose_fructose_ratios(carb_per_hour) {
    if (carb_per_hour < 60) {
        return MOST_RATIOS_OKAY;
    }
    else if (carb_per_hour < 90) {
        return MOST_GLUCOSE_SOME_FRUCTOSE;
    }
    else {
        return GLUCOSE_FRUCTOSE_TWO_ONE;
    }
}

function num_bars(carb_per_hour) {
    return Math.ceil(carb_per_hour / CARBS_PER_BAR);
}

function carb_sources(intensity, duration) {
    if (intensity <= 2) {
        return RECOVERY_ENDURANCE_MODERATE;
    }
    else if (duration <=5) {
        return HARD_WORKOUT_UNDER_3HR;
    }
    else {
        return HARD_WORKOUT_OVER_3HR;
    }
}

function get_gut_training(carbs) {
    if (carbs < 60) {
        return UNDER_60;
    }
    else if (carbs < 90) {
        return BETWEEN_60_90;
    }
    else {
        return OVER_90;
    }
}


function calculateCarbs() {
    var intensity = document.getElementById('intensity').value;
    var duration = document.getElementById('duration').value;
    var carbs = calculateCarbsNeeded(intensity, duration);
    
    // Set carbs
    if (carbs > 0) {
        document.getElementById('carb_amount').innerHTML = carbs;
    }
    else {
        document.getElementById('carb_amount').innerHTML = "No data available for this intensity and duration";
        return
    }

    // Set glucose/fructose ratios
    document.getElementById('num_bars').innerHTML = num_bars(carbs);

    // Set carb sources
    document.getElementById('source').innerHTML = carb_sources(intensity, duration);

    // Set gut training
    document.getElementById('gut_training').innerHTML = get_gut_training(carbs);

}