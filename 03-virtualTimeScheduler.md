# 02 Virtual Time Scheduler

_TAKEAWAYS_

- Don't forget to flush (...seriously!)

- You need to pass `interval` every time there's something
time-related (`timer`, `sampleTime`)

- Using `bufferTime` of 10 sec it's immediately executed

- I'm not returning anything, since `flush` runs synchronously


__QUESTIONS__

