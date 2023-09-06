# NextJS Chat App

Using the latest features of nextjs

- Server Actions
- Optimistic Updates (useOptimistic)

Real-time communication using Pusher

⁉️ I'm stuck now at implementing pusher, checkout components/Chat.tsx for details.

I'm using useEffect to subscribe to the 'messages' channel but this line
`const channel = clientPusher.subscribe('messages');`

throws this error
`Application error: a client-side exception has occurred (see the browser console for more information).`
