use average::Mean;

fn main() {
    let sequence: &[f64] = &[1.2, 2., 3., 4., 5., 6., 7., 8., 9.];
    let sequence_mean: Mean = sequence.iter().map(|x| *x).collect();

    println!("{}", sequence_mean.mean());
}