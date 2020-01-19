use serde::{ Serialize, Deserialize };

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Series {
    timestamp: String,
    value: f64
}

pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn mean(sequence: &Vec<f64>) -> f64 {
    let mut mean: f64 = 0.0;

    for i in 0..sequence.len() {
        mean += sequence[i].clone();
    }

    mean /= sequence.len() as f64;

    return mean;
}

fn extract_value(sequence: &Vec<Series>) -> Vec<f64> {
    let mut temp_sequence: Vec<f64> = Vec::new();

    for i in 0..sequence.len() {
        temp_sequence.push(sequence[i].clone().value);
    }

    return temp_sequence;
}

fn to_pow(sequence: &Vec<f64>, mean: &f64) -> Vec<f64> {
    let mut squares: Vec<f64> = Vec::new();

    for i in 0..sequence.len() {
        squares.push(f64::powi(sequence[i].clone() - mean.clone(), 2));
    }

    return squares;
}

fn variance(squares: &Vec<f64>) -> f64 {
    let mut variance: f64 = 0.0;

    for i in 0..squares.len() {
        variance += squares[i].clone();
    }

    return variance / squares.len() as f64;
}

fn find_outliers(sequence: &Vec<Series>, min: &f64, max: &f64) -> Vec<Series> {
    let mut outliers: Vec<Series> = Vec::new();
    let mut value: f64;
    let temp_max = max.clone();
    let temp_min = min.clone();

    for i in 0..sequence.len() {
        value = sequence[i].clone().value as f64;
        if value > temp_max || value < temp_min {
            outliers.push(sequence[i].clone());
        }
    }

    return outliers;
}

pub fn outlier_detection(json_string: &str) -> Vec<Series> {
    let deserialized: Vec<Series> = serde_json::from_str(&json_string).unwrap();
    let sequence: Vec<f64> = extract_value(&deserialized);
    let sequence_mean: f64 = mean(&sequence);
    let sequence_squares: Vec<f64> = to_pow(&sequence, &sequence_mean);
    let sequence_variances: f64 = variance(&sequence_squares);
    let standard_deviation: f64 = f64::sqrt(sequence_variances);
    let min: f64 = sequence_mean - 3.0 * standard_deviation;
    let max: f64 = sequence_mean + 3.0 * standard_deviation;
    let outliers: Vec<Series> = find_outliers(&deserialized, &min, &max);

    return outliers;
}

//#[cfg(test)]
//mod tests {
//    #[test]
//    fn it_works() {
//        assert_eq!(2 + 2, 4);
//    }
//}