/*
 * goose_publisher_example.c
 */

#include <stdint.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <stdio.h>
#include <sqlite3.h>
#include <signal.h>

#include "mms_value.h"
#include "goose_publisher.h"
#include "hal_thread.h"

#include "hal_time.h"


char dbPath[128] = "../../../GUI/PHPserver/dbHandler/SGData.db";
int id;

void sigint_handler(int signalId)
{
    sqlite3 *db;
    sqlite3_stmt *res;
    char *err_msg = 0;

    int rc = sqlite3_open(dbPath, &db);
    if (rc != SQLITE_OK) {
        
        fprintf(stderr, "Cannot open database: %s\n", sqlite3_errmsg(db));
        sqlite3_close(db);
        
        return;
    }

    char sql[128]; 
    sprintf(sql,"UPDATE GOOSE SET state=0 WHERE id=%d",id);

    rc = sqlite3_exec(db, sql, 0, 0, &err_msg);
    sqlite3_close(db);
    exit(0);
}

void updateGooseDb(char* interface){
    sqlite3 *db;
    sqlite3_stmt *res;
    char *err_msg = 0;

    if(strcmp(interface,"IED1-eth0")==0){
	id = 1;
    }
    else{
	id = 4;
    }

    int rc = sqlite3_open(dbPath, &db);
    if (rc != SQLITE_OK) {
        
        fprintf(stderr, "Cannot open database: %s\n", sqlite3_errmsg(db));
        sqlite3_close(db);
        
        return;
    }

    char sql[128]; 
    sprintf(sql,"UPDATE GOOSE SET state=1 WHERE id=%d",id);

    rc = sqlite3_exec(db, sql, 0, 0, &err_msg);
    sqlite3_close(db);
    
}

//Generates random number from the defined interval
double generateRandomNumber(double minValue, double maxValue)
{
	srand(time(0)); 
	double rNum = ((double) rand() * (maxValue - minValue)) / (double) RAND_MAX + minValue; 
	//printf("Random number generated: %02f \n", rNum); 
	return rNum; 
}

// has to be executed as root!

//GOOSE 6 - 8 
void gooseFloatPoint68(char* interface)
{
    int i = 0;
    for (i = 0; i < 3; i++) { /* for (i = 0; i < 3; i++)*/
	    LinkedList dataSetValues = LinkedList_create(); 	
	    
	    CommParameters gooseCommParameters;
	    gooseCommParameters.appId = 0x0001;
	    gooseCommParameters.dstAddress[0] = 0x01;
	    gooseCommParameters.dstAddress[1] = 0x0c;
	    gooseCommParameters.dstAddress[2] = 0xcd;
	    gooseCommParameters.dstAddress[3] = 0x01;
	    gooseCommParameters.dstAddress[4] = 0x00;
	    
	    if(i == 0) {
               gooseCommParameters.dstAddress[5] = 0x06;			
		 LinkedList_add(dataSetValues, MmsValue_newFloat(generateRandomNumber(5.001, 5.01))); //0x0840A0392E, 5.00698
		 LinkedList_add(dataSetValues, MmsValue_newBitString(16));
	    }
	    if(i == 1) {
               gooseCommParameters.dstAddress[5] = 0x07;
 		LinkedList_add(dataSetValues, MmsValue_newFloat(0)); //0x0800000000
	    }
	    if(i == 2) {
               gooseCommParameters.dstAddress[5] = 0x08;
		 LinkedList_add(dataSetValues, MmsValue_newFloat(5.72096)); //0x0840B7121D
		LinkedList_add(dataSetValues, MmsValue_newBitString(16));
	    }
	    
	    //gooseCommParameters.vlanId = 0;
	    //gooseCommParameters.vlanPriority = 4;
	    GoosePublisher publisher = GoosePublisher_create(&gooseCommParameters, interface);

	    if (publisher) {
		   char s[60];  
		   sprintf(s, "SIPVI3p1_OperationalValues/LLN0$GO$Control_DataSet_%d", i+3); 
		   GoosePublisher_setGoCbRef(publisher, s);
		   GoosePublisher_setConfRev(publisher, 10001);
		   sprintf(s, "SIPVI3p1_OperationalValues/LLN0$DataSet_%d", i+3); 
		   GoosePublisher_setDataSetRef(publisher, s);
		   sprintf(s, "SIP/VI3p1_OperationalValues/LLN0/Control_DataSet_%d", i+3); 
    		   GoosePublisher_setGoID(publisher, s);
		   GoosePublisher_setTimeAllowedToLive(publisher, 3000); 

           if (GoosePublisher_publish(publisher, dataSetValues) == -1) {
	            printf("Error sending message!\n");
	        }
          }
          GoosePublisher_destroy(publisher);
	   LinkedList_destroyDeep(dataSetValues, (LinkedListValueDeleteFunction) MmsValue_delete);
    }
}

void gooseFloatPoint35(char* interface)
{
    int i = 0;
    for (i = 0; i < 3; i++) { /* for (i = 0; i < 3; i++)*/
	    LinkedList dataSetValues = LinkedList_create(); 	
	    
	    CommParameters gooseCommParameters;
	    gooseCommParameters.appId = 0x0001;
	    gooseCommParameters.dstAddress[0] = 0x01;
	    gooseCommParameters.dstAddress[1] = 0x0c;
	    gooseCommParameters.dstAddress[2] = 0xcd;
	    gooseCommParameters.dstAddress[3] = 0x01;
	    gooseCommParameters.dstAddress[4] = 0x00;
	    
	    if(i == 0) {
               gooseCommParameters.dstAddress[5] = 0x03;		 
	    }
	    if(i == 1) {
               gooseCommParameters.dstAddress[5] = 0x04;
	    }
	    if(i == 2) {
               gooseCommParameters.dstAddress[5] = 0x05;		 
	    }
	    LinkedList_add(dataSetValues, MmsValue_newFloat(0)); //0x0800000000
	    LinkedList_add(dataSetValues, MmsValue_newBitString(16));
	    
	    //gooseCommParameters.vlanId = 0;
	    //gooseCommParameters.vlanPriority = 4;
	    GoosePublisher publisher = GoosePublisher_create(&gooseCommParameters, interface);

	    if (publisher) {
		char s_cb[60];
		char s_data[60];  
		char s_go[60];
		if (i == 0) {
			sprintf(s_cb, "SIPVI3p1_OperationalValues/LLN0$GO$Control_DataSet"); 
			sprintf(s_data, "SIPVI3p1_OperationalValues/LLN0$DataSet"); 
			sprintf(s_go, "SIP/VI3p1_OperationalValues/LLN0/Control_DataSet"); 
		}else {
			sprintf(s_cb, "SIPVI3p1_OperationalValues/LLN0$GO$Control_DataSet_%d", i); 
			sprintf(s_data, "SIPVI3p1_OperationalValues/LLN0$DataSet_%d", i); 
			sprintf(s_go, "SIP/VI3p1_OperationalValues/LLN0/Control_DataSet_%d", i); 
		}
		
		GoosePublisher_setGoCbRef(publisher, s_cb);
		GoosePublisher_setDataSetRef(publisher, s_data);
    		GoosePublisher_setGoID(publisher, s_go);
		GoosePublisher_setConfRev(publisher, 10001);
		GoosePublisher_setTimeAllowedToLive(publisher, 3000); 

           if (GoosePublisher_publish(publisher, dataSetValues) == -1) {
	       printf("Error sending message!\n");
	        }
          }
          GoosePublisher_destroy(publisher);
	   LinkedList_destroyDeep(dataSetValues, (LinkedListValueDeleteFunction) MmsValue_delete);
    }
	
}

void gooseSGLab(char* interface, int stNum, int sqNum, bool data)
{
        LinkedList dataSetValues = LinkedList_create(); 	
	CommParameters gooseCommParameters;
	gooseCommParameters.appId = 0x0001;
	gooseCommParameters.dstAddress[0] = 0x01;
	gooseCommParameters.dstAddress[1] = 0x0c;
	gooseCommParameters.dstAddress[2] = 0xcd;
	gooseCommParameters.dstAddress[3] = 0x01;
	gooseCommParameters.dstAddress[4] = 0x00;
        gooseCommParameters.dstAddress[5] = 0x09;

        LinkedList_add(dataSetValues, MmsValue_newFloat(generateRandomNumber(5.001, 5.01))); 
        LinkedList_add(dataSetValues, MmsValue_newBoolean(data));
        LinkedList_add(dataSetValues, MmsValue_newBitString(0));


        GoosePublisher publisher = GoosePublisher_create(&gooseCommParameters, interface);
        GoosePublisher_setGoID(publisher, "SIP/VI3p1_27Undervoltage1/LLN0/Control_DataSet");
	GoosePublisher_setStNumSqNum(publisher, stNum, sqNum);

         if (GoosePublisher_publish(publisher, dataSetValues) == -1) {
	       printf("Error sending message!\n");
	 }
          
          GoosePublisher_destroy(publisher);
	   LinkedList_destroyDeep(dataSetValues, (LinkedListValueDeleteFunction) MmsValue_delete);
} 

int
main(int argc, char** argv)
{
    char* interface;
    int sqNum = 0; 
    float sqNumLimit = generateRandomNumber(15.0, 75.0); 
    float boolRandNum = generateRandomNumber(0.0, 10.0); 
    bool boolRand = false; 
    int stNum = 2100; 
    if (argc > 1)
       interface = argv[1];
    else
       interface = "eth0";

    printf("Using interface %s\n", interface);

    signal(SIGINT, sigint_handler);
    updateGooseDb(interface);

	    while(true) { /* for (i = 0; i < 3; i++)*/
           	if (boolRandNum > 5.0) {
			boolRand = true; 	
		}else{
			boolRand = false; 
		}
		boolRandNum = generateRandomNumber(0.0, 10.0); 
		gooseSGLab(interface, stNum, sqNum++, boolRand);
         	if (sqNum > sqNumLimit) {
			stNum++;
                        sqNum = 0; 
			sqNumLimit = generateRandomNumber(15.0, 75.0); 
 		}
                Thread_sleep(0.2);
	        /*Thread_sleep(2);

               int i = 0;
		for (i = 0; i < 14; i++) { 
			gooseFloatPoint68(interface);
		} 
		Thread_sleep(0.2);
		gooseFloatPoint35(interface);
		*/
	        
	    }

}




