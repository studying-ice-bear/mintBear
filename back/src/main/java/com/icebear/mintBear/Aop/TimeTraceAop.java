package com.icebear.mintBear.Aop;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class TimeTraceAop {

    private final Logger log = LoggerFactory.getLogger(getClass());
    @Around("execution(* com.icebear..*(..))")
    public Object execute(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        String joinPointString = joinPoint.toString();

        log.info("Start={}",joinPointString);

        try {
            return joinPoint.proceed();
        } finally {
            long finish = System.currentTimeMillis();
            long timeMs = finish - start;

            log.info("END={}ms",joinPointString+" "+timeMs);
        }
    }
}