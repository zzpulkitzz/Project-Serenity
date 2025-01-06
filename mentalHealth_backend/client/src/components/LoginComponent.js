import { useState, useContext } from 'react';
import { AuthContext } from '../Authcontext';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signup } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await onSignin(email, password);
      if (result.status === 200) {
        // Successfully signed in
        let uid=result.user.uid
        navigate(`/?uid=${uid}`); // or wherever you want to redirect
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signup(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onSignin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const token = await userCredential.user.getIdToken();
      
      
      return {
        status: 200,
        message: "Login successful",
        token: token,
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email
        }
      };
    } catch (error) {
      let errorMessage;
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address format.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        default:
          errorMessage = 'An unexpected error occurred. Please try again.';
          break;
      }
      return {
        status: 400,
        message: errorMessage
      };
    }
  };

  return (
    <main className="main flex flex-col justify-center items-center h-[61vh]">
      <form 
        className="form flex flex-col bg-white h-md:h-[320px] h-md:w-[430px] h-sm:w-[270px] h-sm:h-[51vh] shadow-md p-[15px] justify-between mt-[40px]"
        onSubmit={isLogin ? handleSignin : handleSignup}
      >
        <h1 className="flex justify-center items-start">
          <span className="text-[22px]">{isLogin ? "Sign In" : "Register"}</span>
        </h1>
        
        {!isLogin && (
          <div className="name flex flex-col justify-between">
            <label htmlFor="name" className="text-sm text-[12px] text-[#5E5E5E] font-semibold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-[rbg(0,10,0)] border-[0.5px] bg-[rgb(249,252,254)] w-[78%]"
            />
          </div>
        )}

        <div className="email flex flex-col justify-between">
          <label htmlFor="email" className="text-sm text-[12px] text-[#5E5E5E] font-semibold">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-[rbg(0,10,0)] border-[0.5px] bg-[rgb(249,252,254)] w-[78%]"
          />
        </div>

        <div className="password flex flex-col justify-between">
          <label htmlFor="password" className="text-sm text-[12px] text-[#5E5E5E] font-semibold">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-[rbg(0,10,0)] border-[0.5px] bg-[rgb(249,252,254)] w-[75%]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[rgb(86,52,243)] text-white mt-[12px] disabled:opacity-50"
        >
          {loading ? "Loading..." : (isLogin ? "Sign In" : "Register")}
        </button>

        {isLogin ? (
          <div className="flex justify-center items-center mt-[-18px] text-sm">
            Not a member yet?{" "}
            <span className="text-[rgb(86,52,243)] cursor-pointer" onClick={() => setIsLogin(false)}>
              Register
            </span>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-[1px] text-sm">
            Already a user?{" "}
            <span className="text-[rgb(86,52,243)] cursor-pointer" onClick={() => setIsLogin(true)}>
              Sign In
            </span>
          </div>
        )}
      </form>

      {error && (
        <div className="mt-[20px] text-red-400">
          {error}
        </div>
      )}
    </main>
  );
};