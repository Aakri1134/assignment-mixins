import { useEffect, useRef } from "react"
import "./App.css"
import Dropdown from "./component/Dropdown"
import useBanner from "./component/Banner"

function App() {
  const name = useRef<HTMLInputElement | null>(null)
  const address = useRef<HTMLTextAreaElement | null>(null)
  const date = useRef<HTMLInputElement | null>(null)
  const branch = useRef<HTMLSelectElement | null>(null)
  const submit = useRef<HTMLInputElement | null>(null)

  const Banner = useBanner()

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        Banner.hideBanner()
        e.preventDefault()
        if (document.activeElement === name.current) {
          address.current?.focus()
          return
        }
        if (document.activeElement === address.current) {
          date.current?.focus()
          return
        }
        if (document.activeElement === date.current) {
          branch.current?.focus()
          return
        }
      }
    }
    window.addEventListener("keydown", keyDown)
    return () => {
      window.removeEventListener("keydown", keyDown)
    }
  }, [])

  function calculateAge() {
    if(!date.current?.value) return 0
    const DOB = new Date(date.current?.value)
    const current = new Date()
    let age = current.getFullYear() - DOB.getFullYear()
    if(current.getMonth() < DOB.getMonth()){
      return age - 1
    }
    else if(current.getMonth() > DOB.getMonth()){
      return age
    }
    else {
      if(current.getDate() < DOB.getDate()){
        return age - 1
      }
      return age
    }
  }

  function validate() {

    const nameRegex = new RegExp("^[A-Za-z\s]{2,}$")
    const addressRegex = new RegExp("^[A-Za-z0-9\s,-.]{10,}$")

    if (!name.current?.value || !nameRegex.test(name.current.value)) {
      Banner.setBannerData({
      type: "Error",
      heading: "Validation Error",
      message: "Name is required to be atleast 3 characters",
      })
      return false
    }
    if (!address.current?.value || !addressRegex.test(address.current.value)) {
      Banner.setBannerData({
        type: "Error",
        heading: "Validation Error",
        message: "Address is required",
      })
      return false
    }
    if (!date.current?.value) {
      Banner.setBannerData({
        type: "Error",
        heading: "Validation Error",
        message: "Date is required",
      })
      return false
    }
    if (!branch.current?.value) {
      Banner.setBannerData({
        type: "Error",
        heading: "Validation Error",
        message: "Branch is required",
      })
      return false
    }
    return true
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!validate()) {
      return
    }

    console.log("Name:", name.current?.value)
    console.log("Address:", address.current?.value)
    console.log("Date:", date.current?.value)
    console.log("Branch:", branch.current?.value)
    console.log("Age:", calculateAge() )
    

    Banner.setBannerData({
      type: "Success",
      heading: "Form Submitted" ,
      message: `Calculated Age : ${calculateAge()}`,
    })

    if (name.current) name.current.value = ""
    if (address.current) address.current.value = ""
    if (date.current) date.current.value = ""
    if (branch.current) branch.current.value = ""
  }

  return (
    <div
      className="flex flex-row h-screen w-screen justify-center items-center  md:items-stretch"
      style={{
        background: "linear-gradient(135deg, #FF9EB0 0%,  #E4FFA1 100%)",
        transition: "background 0.3s ease-out", // Smoother transition
      }}
      onMouseMove={(e) => {
        const x = e.clientX / window.innerWidth
        const y = e.clientY / window.innerHeight
        const angle = Math.round(135 + x * 90 + y * 45)

        e.currentTarget.style.background = `linear-gradient(${angle}deg, 
        #FF9EB0 0%, 
        #E4FFA1 100%)`
      }}
    >
      <Banner.BannerComponent />
      <div className=" flex flex-col gap-5 items-center justify-center p-5 rounded-2xl md:rounded-none min-w-[320px] w-[45%] bg-amber-50">
        <h1 className="font-heading text-3xl text-[#ff748d] text-center text-shadow-[2px_2px_0] text-shadow-[#9c9c9c] animate-heading">
          Student Registration Form
        </h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            className={`border-2 translate-y-1 border-[#242424] p-2 rounded-md text-[#242424]
            focus:outline-none focus:shadow-[0_0_0_1px_#242424] focus:translate-0 duration-150`}
            ref={name}
            placeholder="Enter Full Name..."
            type="text"
          />
          <textarea
            className={`border-2 translate-y-1 border-[#242424] p-2 rounded-md text-[#242424] resize-none no-scrollbar
          focus:outline-none focus:translate-0 focus:shadow-[0_0_0_1px_#242424] duration-150`}
            ref={address}
            placeholder="Enter Address..."
            rows={4}
          />
          <input
            className={`border-2 translate-y-1 border-[#242424] p-2 rounded-md text-[#242424]
            focus:outline-none focus:translate-0 focus:shadow-[0_0_0_1px_#242424] duration-150`}
            ref={date}
            placeholder="Enter Full Name..."
            type="date"
            max={
              new Date(new Date().getTime() - 18 * 365 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0]
            }
          />
          <Dropdown
            className={`border-2 translate-y-1 border-[#242424] p-2 rounded-md text-[#242424]
          focus:outline-none  focus:translate-0 focus:shadow-[0_0_0_1px_#242424]  duration-150`}
            ref={branch}
            options={[
              { value: "CSE", label: "Computer Science Engineering" },
              { value: "IT", label: "Information Technology" },
              {
                value: "ECE",
                label: "Electronics and Communication Engineering",
              },
              { value: "ME", label: "Mechanical Engineering" },
            ]}
          />
          <input
            className="bg-[#2e8bf5] translate-y-1 p-2 rounded-md text-white cursor-pointer focus:outline-none border-white hover:shadow-[inset_0_0_0_2px_white] duration-150"
            ref={submit}
            type="submit"
          />
        </form>
      </div>
    </div>
  )
}

export default App
