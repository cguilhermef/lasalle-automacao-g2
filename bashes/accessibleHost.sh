#!/bin/bash

ping_pesq=`ping -q -c1 $1 | grep received | cut -d " " -f 4`

return 10
