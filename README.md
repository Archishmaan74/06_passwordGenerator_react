# Password Generator
This React based Password Generator uses useEffect to regenerate the password automatically when user preferences change. The useCallback hook is used to memoize the password generation logic for better performance. useRef allows direct access to the password input field for actions like copying to clipboard without triggering re-renders.
