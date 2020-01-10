library(ggplot2)

logs = read.csv2("minuteLogHeap2.csv", header = TRUE, sep = ",")

ggplot(data=logs,aes(x=date,y=value, group=1)) +
  geom_line() +
  geom_point()

