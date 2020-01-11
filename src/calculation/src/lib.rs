fn main() {
    println!("Hello, world!");

    println!("{}", add(1,2));
}

#[no_mangle]
pub fn add(a: i32, b: i32) -> i32 {
    return a + b
}