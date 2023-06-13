// Setup function: jika ingin menjalankan fungsi sebelum test atau setelah test

// beforeEach(function): Function akan dieksekusi sebelum unit test berjalan
// afterEach(function): Function akan dieksekusi setelah unit test berjalan

beforeAll(()=>{
    console.log("fungsi dimulai pertama kali")
})

afterAll(()=>{
    console.log("fungsi dimulai terakhir kali")
})

beforeEach(()=>{
    console.log("Before Each")
})

afterEach(()=>{
    console.log("After Each")
})

test("first test", () => {
    const value = 1 + 1
    expect(value).toBe(2)
})

test("second test", () => {
    const value = 1 + 1
    expect(value).toBe(2)
})