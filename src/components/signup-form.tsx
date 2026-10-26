import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { NavLink, useNavigate } from "react-router-dom"
import { useState, type SyntheticEvent } from "react"
import { Switch } from "@/components/ui/switch"
import { sendOTPToUserForRegisterAPI } from "@/API/user.API"
import { useDispatch } from "react-redux"
import { setRegisterFormDetails } from "@/stores/RegisterStore"
import { Spinner } from "./ui/spinner"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const navigate = useNavigate()

  // const registerDetails = useSelector((state: any) => state.registerDetails);
  const dispatch = useDispatch();


  const [registerFormData, setRegisterFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)


  const handleFormInputChange = (e: any) => setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value })

  const handleFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(setRegisterFormDetails({ ...registerFormData }))
    setIsSubmitting(true)

    try {
      const data = await sendOTPToUserForRegisterAPI(registerFormData)
      if (data) {
        toast.success(data.message, {
          position: 'top-right'
        })

        navigate('/verify-otp-for-register')
      }
    } catch (error : any) {
      toast.error(error.response.data.message, {
        position: 'top-right'
      })
    } finally {
      setIsSubmitting(false)
    }
  }



  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Fill the form below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <FieldGroup>


              <Field>
                <FieldLabel htmlFor="firstName">Full Name</FieldLabel>
                <Input id="firstName" name="firstName" type="text" placeholder="John" required value={registerFormData.firstName} onChange={handleFormInputChange} />
              </Field>

              <Field>
                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                <Input id="lastName" name="lastName" type="text" placeholder="Doe" required value={registerFormData.lastName} onChange={handleFormInputChange} />
              </Field>



              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required value={registerFormData.email} onChange={handleFormInputChange} />
              </Field>


              <Field>
                <FieldLabel htmlFor="password"> Password </FieldLabel>
                <Input id="password" name="password" type={showPassword ? "text": "password"} placeholder="Password" required value={registerFormData.password} onChange={handleFormInputChange} />
                <FieldDescription> Must be at least 8 characters long </FieldDescription>
              </Field>


              <Field>
                <FieldLabel htmlFor="confirm-password"> Confirm Password </FieldLabel>
                <Input id="confirm-password" name="confirmPassword" type={showPassword ? "text": "password"} placeholder="Confirm Password" required value={registerFormData.confirmPassword} onChange={handleFormInputChange} />
              </Field>


              <Field className="flex-row">
                <Switch id="show-password" checked={showPassword} onCheckedChange={() => setShowPassword(!showPassword)} />
                <FieldLabel htmlFor="show-password"> Show Password </FieldLabel>
              </Field>

              <Field>
                <Button type="submit" disabled={isSubmitting}> {isSubmitting || 'Create Account'} {isSubmitting && <> <Spinner /> Sending OTP... </>}   </Button>
                <FieldDescription className="text-center">
                  Already have an account? <NavLink to={"/sign-in"}>Sign in</NavLink>
                </FieldDescription>
              </Field>
            </FieldGroup>


          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}